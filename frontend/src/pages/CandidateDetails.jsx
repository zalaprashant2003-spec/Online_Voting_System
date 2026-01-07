import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/CandidateDetails.css'

export default function CandidateDetails() {
  const { id: electionId } = useParams()
  const navigate = useNavigate()
  const [candidates, setCandidates] = useState([])
  const [form, setForm] = useState({ name: '', age: '', description: '', image: null })
  const [openId, setOpenId] = useState(null)

  const load = async () => {
    const res = await axios.get(`http://localhost:5000/api/candidates/${electionId}`)
    setCandidates(res.data)
  }

  useEffect(() => { load() }, [electionId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    await axios.post(`http://localhost:5000/api/candidates/${electionId}`, data)
    setForm({ name: '', age: '', description: '', image: null })
    load()
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/candidates/${id}`)
    load()
  }

  return (
    <div className="candidate-container">
      <button onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>Candidates</h2>

      <form onSubmit={handleSubmit} className="candidate-form">
        <input placeholder="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Age" value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })} required />
        <textarea placeholder="Description" value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })} required></textarea>

        <input type="file" id="candidateFile"
          onChange={e => setForm({ ...form, image: e.target.files[0] })} style={{ display: 'none' }} required />
        <label htmlFor="candidateFile" className="file-label">Choose Image</label>
        {form.image && <span className="file-name">{form.image.name}</span>}

        <button type="submit">Add Candidate</button>
      </form>

      <ul className="candidate-list">
        {candidates.map(c => (
          <li key={c._id} className={`candidate-item ${openId === c._id ? 'open' : ''}`}>
            
            <div className="delete-icon" onClick={() => handleDelete(c._id)}>🗑️</div>
            <img src={`http://localhost:5000/uploads/${c.image}`} alt={c.name} />

            <div className="candidate-header">
              <div className="candidate-info">
                <label>Name:</label> <b>{c.name}</b>
              </div>

              <button
                className={`toggle-btn ${openId === c._id ? 'open' : ''}`}
                onClick={() => setOpenId(openId === c._id ? null : c._id)}>
                ▶
              </button>
            </div>

            <div className="candidate-details">
              <p><label>Age:</label> {c.age}</p>
              <p><label>Description:</label> {c.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
