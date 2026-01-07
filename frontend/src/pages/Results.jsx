import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import '../styles/Results.css';

function Results() {
  const { electionId } = useParams(); // get electionId from URL
  const [results, setResults] = useState([]);
  const [winner, setWinner] = useState(null);
  const [electionName, setElectionName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/api/results/${electionId}`)
      .then(res => {
        setResults(res.data.results);
        setWinner(res.data.winner);
        setElectionName(res.data.election);
      })
      .catch(err => console.error('Error fetching results:', err));
  }, [electionId]);

  return (
    <div className="results-container">
      <h2>📊 Election Results: {electionName}</h2>

      {results.length > 0 ? (
        <>
          <table className="results-table">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Total Votes</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.candidateId}>
                  <td>{r.name}</td>
                  <td>{r.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {winner && (
            <div className="winner-card">
              🏆 <strong>{winner.name}</strong> is the Winner with {winner.votes} votes!
            </div>
          )}
        </>
      ) : (
        <p>No votes have been cast yet.</p>
      )}

      <button onClick={() => navigate('/admin')} className="back-btn">Back to Admin</button>
    </div>
  );
}

export default Results;
