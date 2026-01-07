import { useNavigate } from 'react-router-dom'
import '../styles/VoterHome.css'
import { useEffect, useState } from 'react'
import API from '../api'

function VoterHome() {
  const navigate = useNavigate()
  const [elections, setElections] = useState([])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const fetchRunningElections = () => {
    API.get('/api/elections/running')
      .then((res) => setElections(res.data))
      .catch((err) => console.error('Error fetching running elections:', err))
  }

useEffect(() => {
  fetchRunningElections();
}, []);

  return (
    <div className="voterhome-container">
      <div className="voterhome-left">
        <div className="left-content">
          <h1>Welcome Voter</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="voterhome-right">
        <nav className="navbar">
          <div className="nav-left">
            <h2>Voting System</h2>
          </div>
          <div className="nav-right">
            <button onClick={() => navigate('/voter-results')}>View Results</button>
            <button onClick={() => navigate('/voter')}>Home</button>
          </div>
        </nav>

        <div className="cards-container">
          {elections.length === 0 && <p>No elections are currently running.</p>}

          {elections.map((e) => (
            <div className="card" key={e._id}>
              <img
                src={e.image ? `http://localhost:5000/uploads/${e.image}` : 'https://via.placeholder.com/200x120'}
                alt={e.name}
              />
              <h3>{e.name}</h3>
              <button onClick={() => navigate(`/voter-candidates/${e._id}`)}>
                View Candidates
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VoterHome
