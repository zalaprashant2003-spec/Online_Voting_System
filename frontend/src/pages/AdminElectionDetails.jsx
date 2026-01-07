import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/AdminElectionDetails.css'

export default function AdminElectionDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const election = location.state
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    if (election?._id) {
      axios
        .get(`http://localhost:5000/api/candidates/${election._id}`)
        .then(res => setCandidates(res.data))
        .catch(err => console.error(err))
    }
  }, [election])

  return (
    <div className="admin-election-details">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>{election?.name} - Candidates</h2>

      <div className="candidates-grid">
        {candidates.length === 0 && <p>No candidates found.</p>}
        {candidates.map(c => (
          <div className="candidate-card" key={c._id}>
            <img src={`http://localhost:5000/uploads/${c.image}`} alt={c.name} />
            <h3>{c.name}</h3>
            <p><b>Age:</b> {c.age}</p>
            <p className="desc">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
