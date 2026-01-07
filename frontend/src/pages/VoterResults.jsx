import { useEffect, useState } from 'react';
import API from '../api';
import '../styles/Results.css';
import { useNavigate } from 'react-router-dom';

export default function VoterResults() {
  const [elections, setElections] = useState([]);
  const [winnersByElection, setWinnersByElection] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/api/elections')
      .then(res => {
        setElections(res.data);
        return res.data;
      })
      .then(list => {
        const promises = list.map(e =>
          API.get(`/api/results/${e._id}`).then(r => ({ electionId: e._id, data: r.data }))
        );
        return Promise.all(promises);
      })
      .then(all => {
        const map = {};
        all.forEach(item => {
          map[item.electionId] = item.data?.winner || null;
        });
        setWinnersByElection(map);
      })
      .catch(err => console.error('Error fetching winners:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>Election Winners</h1>
        <button onClick={() => navigate('/voter')}>Back to Home</button>
      </div>

      {loading ? <p>Loading...</p> : null}

      <div className="winners-grid">
        {elections.length === 0 && !loading && <p>No elections found.</p>}

        {elections.map(e => {
          const winner = winnersByElection[e._id];
          return (
            <div className="winner-card" key={e._id}>
              <img
                src={e.image ? `http://localhost:5000/uploads/${e.image}` : 'https://via.placeholder.com/260x140'}
                alt={e.name}
              />
              <div className="winner-info">
                <h3>{e.name}</h3>
                {winner ? (
                  <>
                    <div className="winner-name">🏆 {winner.name}</div>
                    <div className="winner-votes">{winner.votes} votes</div>
                  </>
                ) : (
                  <div className="no-winner">No votes yet</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
