import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/AddCandidates.css'
import { useState } from 'react'
import API from '../api'

function AddCandidates() {
  const location = useLocation()
  const navigate = useNavigate()
  const election = location.state
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [desc, setDesc] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${API}/candidates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age, description: desc, electionId: election._id })
    }).then(() => {
      alert(`Candidate ${name} added`)
      navigate('/admin')
    })
  }

  return (
    <div className="add-container">
      <h2>Add Candidate to {election?.name}</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={age} onChange={e => setAge(e.target.value)} placeholder="Age" required />
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" required />
        <button type="submit">Add</button>
        <button type="button" onClick={() => navigate('/admin')}>Back</button>
      </form>
    </div>
  )
}

export default AddCandidates
