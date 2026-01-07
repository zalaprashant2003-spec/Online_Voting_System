import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('voter')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/user/login', { email, password, role })
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        if (res.data.user.role === 'admin') navigate('/admin')
        else navigate('/voter')
      } else {
        setMessage(res.data.message)
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error logging in')
    }
  }

  return (
    <div className="login-container">
      {/* Left Panel */}
      <div className="login-left">
        <h2>Don't have an account?</h2>
        <button onClick={() => navigate('/register')}>Sign Up</button>
      </div>

      {/* Right Panel */}
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
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
          <button type="submit">Login</button>
          {message && <div className="login-message">{message}</div>}
        </form>
      </div>
    </div>
  )
}
