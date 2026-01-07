import { useNavigate } from 'react-router-dom'
import '../styles/AdminHome.css'
import { useEffect, useState } from 'react'
import API from '../api'

function AdminHome() {
  const navigate = useNavigate()
  const [elections, setElections] = useState([])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const fetchElections = () => {
    API.get('/api/elections')
      .then((res) => setElections(res.data))
      .catch((err) => console.error('Error fetching elections:', err));
  }

  useEffect(() => {
    fetchElections()
  }, []);

  const startVoting = (id) => {
    API.put(`/api/elections/${id}/start`)
      .then(fetchElections)
      .catch(err => console.error('Error starting voting:', err));
  }

  const endVoting = (id) => {
    API.put(`/api/elections/${id}/end`)
      .then(fetchElections)
      .catch(err => console.error('Error ending voting:', err));
  }

  return (
    <div className="adminhome-container">
      <div className="adminhome-left">
        <h1>Welcome Admin</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="adminhome-right">
        <nav className="navbar">
          <div className="nav-left">
            <h2>Admin Panel</h2>
          </div>
          <div className="nav-right">
            <button onClick={() => navigate('/voter-list')}>Voter List</button>
            <button onClick={() => navigate('/manage-elections')}>Elections</button>
             <button onClick={() => navigate('/results-page')}>Results</button>
          </div>
        </nav>

        <div className="cards-container">
          {elections.map((e) => (
            <div className="card" key={e._id}>
              <img
                src={e.image ? `http://localhost:5000/uploads/${e.image}` : 'https://via.placeholder.com/200x120'}
                alt={e.name}
                onClick={() => navigate(`/admin-candidates/${e._id}`)}
              />
              <h3>{e.name}</h3>
              {e.status && <p>Status: {e.status}</p>}

              {/* Buttons container */}
              <div className="card-buttons">
                {e.status === 'pending' && (
                  <button className="start-btn" onClick={() => startVoting(e._id)}>Start Voting</button>
                )}
                {e.status === 'start' && (
                  <button className="end-btn" onClick={() => endVoting(e._id)}>End Voting</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminHome
