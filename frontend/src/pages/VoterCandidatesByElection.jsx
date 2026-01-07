import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api';
import '../styles/VoterCandidatesByElection.css';
import '../styles/VotePopup.css';
import { useNavigate } from 'react-router-dom';

function VoterCandidatesByElection() {
  const { electionId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null); // ✅ for popup

  const voter = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
  useEffect(() => {
    API.get(`/api/candidates/${electionId}`)
      .then(res => setCandidates(res.data))
      .catch(err => console.error('Error fetching candidates:', err));
  }, [electionId]);

  const handleVote = async (candidateId) => {
     if (!voter?._id) {
    alert('Login session invalid. Please log in again.');
    navigate('/login');
    return;
  }
    try {
      await API.post('/api/votes', {
        electionId,
        candidateId,
        voterId: voter?._id
      });
      alert('Your vote has been submitted!');
      setVotedCandidate(candidateId);
      setSelectedCandidate(null);
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('You may have already voted or an error occurred.');
    }
  };

  return (
    <div className="voter-page">
      <h2 className="page-title">Vote for Your Candidate</h2>

      <div className="candidates-container">
        {candidates.length > 0 ? (
          candidates.map(c => (
            <div key={c._id} className="candidate-card">
              <img
                src={c.image ? `http://localhost:5000/uploads/${c.image}` : 'https://via.placeholder.com/150x120'}
                alt={c.name}
                className="candidate-image"
              />
              <h3>{c.name}</h3>
              <p>Age: {c.age}</p>
              <p className="candidate-desc">{c.description}</p>

              {votedCandidate === c._id ? (
                <p className="voted-label">You voted</p>
              ) : (
                <button
                  onClick={() => setSelectedCandidate(c)} // ✅ show popup instead of window.confirm
                  disabled={!!votedCandidate}
                  className={`vote-btn ${votedCandidate ? 'disabled' : ''}`}
                >
                  Vote
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No candidates found</p>
        )}
      </div>

      {/* ✅ Custom Popup Modal */}
      {selectedCandidate && (
        <div className="vote-popup-overlay">
          <div className="vote-popup-card">
            <img
              src={selectedCandidate.image ? `http://localhost:5000/uploads/${selectedCandidate.image}` : 'https://via.placeholder.com/150x120'}
              alt={selectedCandidate.name}
            />
            <h2>{selectedCandidate.name}</h2>
            <p>Are you sure you want to vote for this candidate?</p>
            <div className="vote-popup-actions">
              <button
                onClick={() => handleVote(selectedCandidate._id)}
                className="confirm-btn"
              >
                Confirm Vote
              </button>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VoterCandidatesByElection;
