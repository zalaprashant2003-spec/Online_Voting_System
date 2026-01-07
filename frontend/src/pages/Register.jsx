import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/Register.css'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('voter')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/user/signup', { email, password, role })
      if (res.data.message === 'Signup successful') {
        navigate('/login')
      } else {
        setMessage(res.data.message)
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error registering')
    }
  }

  return (
    <div className="register-container">
      {/* Left Panel */}
      <div className="register-left">
        <h2>Already have an account?</h2>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>

      {/* Right Panel */}
      <div className="register-right">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div className="role-group">
            <label>
              <input type="radio" value="voter" checked={role==='voter'} onChange={e => setRole(e.target.value)} /> Voter
            </label>
            <label>
              <input type="radio" value="admin" checked={role==='admin'} onChange={e => setRole(e.target.value)} /> Admin
            </label>
          </div>
          <button type="submit">Sign Up</button>
          {message && <div className="register-message">{message}</div>}
        </form>
      </div>
    </div>
  )
}
