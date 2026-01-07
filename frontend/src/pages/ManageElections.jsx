import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import '../styles/ManageElections.css'

function ManageElections() {
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [elections, setElections] = useState([])
  const navigate = useNavigate()

  const fetchElections = () => {
    api.get('/api/elections')
      .then(res => setElections(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchElections()
  }, [])

  const handleAdd = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)
    api.post('/api/elections', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(() => {
      setName('')
      setImage(null)
      fetchElections()
    })
  }

  const handleDelete = (id) => {
    api.delete(`/api/elections/${id}`).then(() => fetchElections())
  }

  return (
    <div className="manage-container">
      <div className="back-container">
        <button className="back-btn" onClick={() => navigate('/admin')}>
          ← Back to Home
        </button>
      </div>

      <h2>Manage Elections</h2>

      <form onSubmit={handleAdd} className="add-form">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Election Name"
          required
        />

        <input
          type="file"
          id="fileUpload"
          onChange={e => setImage(e.target.files[0])}
          required
          style={{ display: 'none' }}
        />

        <label htmlFor="fileUpload" className="file-label">
          Choose File
        </label>

        {image && <span className="file-name">{image.name}</span>}

        <button type="submit">Add Election</button>
      </form>

      <div className="election-list">
        {elections.map(e => (
          <div
            className="election-card"
            key={e._id}
            onClick={() => navigate(`/candidates/${e._id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={`http://localhost:5000/uploads/${e.image}`} alt={e.name} />
            <h3>{e.name}</h3>
            <button
              onClick={(ev) => {
                ev.stopPropagation()
                handleDelete(e._id)
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageElections
