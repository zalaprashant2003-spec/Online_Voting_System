import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/VoterList.css';

function VoterList() {
  const [voters, setVoters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/user/voters')
      .then(res => setVoters(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="voterlist-container">
      <div className="back-container">
        <button className="back-btn" onClick={() => navigate('/admin')}>
          ← Back to Home
        </button>
      </div>

      <h2>Registered Voters</h2>
      <ul>
        {voters.map((v, i) => (
          <li key={i}>{v.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default VoterList;
