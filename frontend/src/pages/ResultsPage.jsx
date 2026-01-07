import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import '../styles/Results.css';

function ResultsPage() {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/api/elections')
      .then(res => setElections(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="results-container">
      <h2>📊 Election Results</h2>
      {elections.length > 0 ? (
        <div className="cards-container">
          {elections.map(e => (
            <div key={e._id} className="card">
              <h3>{e.name}</h3>
              <button onClick={() => navigate(`/results/${e._id}`)}>
                View Results
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No elections found.</p>
      )}
    </div>
  );
}

export default ResultsPage;
