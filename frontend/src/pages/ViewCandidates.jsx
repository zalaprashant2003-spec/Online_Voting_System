import { useEffect, useState } from 'react';
import API from '../api';
import '../styles/ViewCandidates.css';

function ViewCandidates({ electionId, voterId }) {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    API.get(`/elections/${electionId}/candidates`)
      .then(res => setCandidates(res.data))
      .catch(err => console.error(err));
  }, [electionId]);

  const handleVoteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setShowConfirm(true);
  };

  const confirmVote = () => {
    API.post('/votes', {
      electionId,
      candidateId: selectedCandidate._id,
      voterId
    })
      .then(() => {
        alert('Vote submitted successfully!');
        setShowConfirm(false);
        setSelectedCandidate(null);
      })
      .catch(err => {
        console.error(err);
        alert('Error submitting vote');
      });
  };

  return (
    <div className="candidates-container">
      {candidates.map(c => (
        <div key={c._id} className="candidate-card">
          <h3>{c.name}</h3>
          <p>Party: {c.party}</p>
          <button className="vote-btn" onClick={() => handleVoteClick(c)}>Vote</button>
        </div>
      ))}

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Your Vote</h3>
            <p>Are you sure you want to vote for <strong>{selectedCandidate?.name}</strong>?</p>
            <div className="modal-buttons">
              <button onClick={confirmVote}>Yes, Vote</button>
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCandidates;
