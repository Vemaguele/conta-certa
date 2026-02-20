// src/auth/LoginPage.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await login(username, password)
      if (user) {
        navigate('/')
      }
    } catch (err) {
      setError(err.toString())
    } finally {
      setLoading(false)
    }
  }

  // Usuários de demonstração
  const demoUsers = [
    { username: 'admin', password: 'admin123', label: 'Admin (Nível 1)' },
    { username: 'gestor', password: 'gestor123', label: 'Gestor (Nível 2)' },
    { username: 'user', password: 'user123', label: 'Utilizador (Nível 3)' }
  ]

  const fillDemoUser = (user) => {
    setUsername(user.username)
    setPassword(user.password)
  }

  return (
    <div className="login-page bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white text-center py-4">
                <div className="logo mb-2">
                  <i className="bi bi-calculator fs-1"></i>
                </div>
                <h2 className="mb-0">ContaPro</h2>
                <p className="mb-0 opacity-75">Sistema de Contabilidade</p>
              </div>
              
              <div className="card-body p-5">
                <h3 className="text-center mb-4">Autenticação</h3>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label fw-semibold">
                      <i className="bi bi-person me-2"></i>Utilizador
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-lg"
                      placeholder="Digite o utilizador"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">
                      <i className="bi bi-lock me-2"></i>Palavra-passe
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      placeholder="Digite a palavra-passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 py-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        A autenticar...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Entrar
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-5">
                  <h6 className="text-center text-muted mb-3">Demonstração (clique para preencher):</h6>
                  <div className="row g-2">
                    {demoUsers.map((demoUser, index) => (
                      <div key={index} className="col-12">
                        <button
                          type="button"
                          className="btn btn-outline-secondary w-100"
                          onClick={() => fillDemoUser(demoUser)}
                          disabled={loading}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span>{demoUser.label}</span>
                            <small className="text-muted">
                              {demoUser.username} / {demoUser.password}
                            </small>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Sistema protegido com autenticação de 3 níveis
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage