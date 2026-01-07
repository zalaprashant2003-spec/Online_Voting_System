import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api';

function CandidatesByElection() {
  const { electionId } = useParams();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    API.get(`/api/candidates/${electionId}`)
      .then(res => setCandidates(res.data))
      .catch(err => console.error('Error fetching candidates:', err));
  }, [electionId]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Candidates</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {candidates.length > 0 ? candidates.map(c => (
          <div key={c._id} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            width: '200px',
            textAlign: 'center'
          }}>
            <img
              src={c.image ? `http://localhost:5000/uploads/${c.image}` : 'https://via.placeholder.com/120x100'}
              alt={c.name}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h3>{c.name}</h3>
            <p>Age: {c.age}</p>
            <p>{c.description}</p>
          </div>
        )) : <p>No candidates found</p>}
      </div>
    </div>
  );
}

export default CandidatesByElection;
