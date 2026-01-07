import { useEffect, useState } from 'react';
import API from '../api';
import '../styles/Results.css';
import { useNavigate } from 'react-router-dom';

export default function AdminResults() {
  const [elections, setElections] = useState([]);
  const [resultsByElection, setResultsByElection] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/api/elections')
      .then(res => {
        setElections(res.data);
        return res.data;
      })
      .then(list => {
        // fetch results for each election
        const promises = list.map(e =>
          API.get(`/api/results/${e._id}`).then(r => ({ electionId: e._id, data: r.data }))
        );
        return Promise.all(promises);
      })
      .then(all => {
        const map = {};
        all.forEach(item => {
          map[item.electionId] = item.data;
        });
        setResultsByElection(map);
      })
      .catch(err => console.error('Error fetching results:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>Election Results (Admin)</h1>
        <button onClick={() => navigate('/admin')}>Back to Admin</button>
      </div>

      {loading ? <p>Loading...</p> : null}

      <div className="results-grid">
        {elections.length === 0 && !loading && <p>No elections found.</p>}

        {elections.map(e => {
          const resData = resultsByElection[e._id];
          const winner = resData?.winner || null;
          const results = resData?.results || [];

          return (
            <div className="result-election-card" key={e._id}>
              <div className="result-election-top">
                <img
                  src={e.image ? `http://localhost:5000/uploads/${e.image}` : 'https://via.placeholder.com/240x120'}
                  alt={e.name}
                />
                <div className="result-election-info">
                  <h2>{e.name}</h2>
                  {winner ? (
                    <div className="winner-pill">
                      🏆 {winner.name} ({winner.votes} votes)
                    </div>
                  ) : (
                    <div className="winner-pill neutral">No votes yet</div>
                  )}
                </div>
              </div>

              <div className="candidates-list">
                {results.length === 0 ? (
                  <p className="no-candidates">No candidates or no votes.</p>
                ) : (
                  results
                    .sort((a, b) => b.votes - a.votes)
                    .map(c => (
                      <div className={`candidate-result`} key={c.candidateId}>
                        <img
                          src={c.image ? `http://localhost:5000/uploads/${c.image}` : 'https://via.placeholder.com/100x80'}
                          alt={c.name}
                        />
                        <div className="candidate-info">
                          <div className="candidate-name">{c.name}</div>
                          <div className="candidate-votes">{c.votes} votes</div>
                        </div>
                        {winner && String(winner.candidateId) === String(c.candidateId) && (
                          <div className="candidate-winner">Winner</div>
                        )}
                      </div>
                    ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
