import { useState } from 'react'
import './App.css'

function App() {
  const [mode, setMode] = useState('Unauthenticated')
  const [logs, setLogs] = useState(['Welcome to Vulnerability Scanning Tutorial', 'Select a scan type to learn more'])

  const scanInfo = {
    'Unauthenticated': {
      title: 'Unauthenticated Scan',
      description: 'External perspective scanning without credentials. Limited visibility into system internals.',
      features: [
        'No credentials required',
        'Scans from outside the network',
        'Detects externally visible vulnerabilities',
        'Cannot see internal configurations',
        'Limited depth of analysis'
      ],
      useCase: 'Simulates an external attacker\'s view'
    },
    'Authenticated': {
      title: 'Authenticated Scan',
      description: 'Uses valid credentials to perform deeper system analysis. Better visibility and accuracy.',
      features: [
        'Requires valid credentials',
        'Access to system configurations',
        'Detects missing patches',
        'Checks installed software versions',
        'More accurate results'
      ],
      useCase: 'Internal security audits and compliance'
    },
    'Agent': {
      title: 'Agent-Based Scan',
      description: 'Lightweight software agent installed on target systems. Continuous monitoring and real-time data.',
      features: [
        'Agent installed on endpoints',
        'Real-time vulnerability detection',
        'Minimal network traffic',
        'Offline scanning capability',
        'Comprehensive system access'
      ],
      useCase: 'Continuous security monitoring and compliance'
    }
  }

  const handleModeChange = (newMode) => {
    setMode(newMode)
    const info = scanInfo[newMode]
    setLogs(prev => [
      ...prev,
      `─────────────────────────────`,
      `Switched to: ${info.title}`,
      `Description: ${info.description}`,
      `Use Case: ${info.useCase}`
    ])
  }

  const getMapStyle = () => {
    switch(mode) {
      case 'Unauthenticated':
        return { filter: 'blur(8px)', opacity: 0.3 }
      case 'Authenticated':
        return { filter: 'none', opacity: 1 }
      case 'Agent':
        return { filter: 'none', opacity: 1, outline: '3px solid #0f0' }
      default:
        return {}
    }
  }

  const currentInfo = scanInfo[mode]

  return (
    <div className="app">
      <header className="app-header">
        <h1>Vulnerability Scanning Tutorial</h1>
        <p className="subtitle">Learn about different types of security scans</p>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <div className="instructions">
            <h3>📚 Instructions</h3>
            <p>Click on each scan type below to learn how it works. Watch the map visualization change to represent the level of visibility each scan type provides.</p>
          </div>

          <div className="mode-buttons">
            <button 
              className={mode === 'Unauthenticated' ? 'active' : ''}
              onClick={() => handleModeChange('Unauthenticated')}
            >
              🔒 Unauthenticated Scan
            </button>
            <button 
              className={mode === 'Authenticated' ? 'active' : ''}
              onClick={() => handleModeChange('Authenticated')}
            >
              🔑 Authenticated Scan
            </button>
            <button 
              className={mode === 'Agent' ? 'active' : ''}
              onClick={() => handleModeChange('Agent')}
            >
              🤖 Agent-Based Scan
            </button>
          </div>

          <div className="info-panel">
            <h2>{currentInfo.title}</h2>
            <p className="description">{currentInfo.description}</p>
            <div className="features">
              <h4>Key Features:</h4>
              <ul>
                {currentInfo.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="use-case">
              <strong>Best Use Case:</strong> {currentInfo.useCase}
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="map-container">
            <div className="map-label">Network Visualization - {mode} Perspective</div>
            <svg viewBox="0 0 600 400" style={getMapStyle()}>
          {/* Background */}
          <rect width="600" height="400" fill="#1a1a2e" />
          
          {/* Grid lines */}
          {[...Array(12)].map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="#2a2a4e" strokeWidth="1" />
          ))}
          {[...Array(8)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="#2a2a4e" strokeWidth="1" />
          ))}
          
          {/* Terrain features */}
          <circle cx="150" cy="100" r="40" fill="#16213e" stroke="#4a5568" strokeWidth="2" />
          <rect x="300" y="150" width="100" height="80" fill="#0f3460" stroke="#4a5568" strokeWidth="2" />
          <polygon points="450,250 500,200 550,250 500,300" fill="#16213e" stroke="#4a5568" strokeWidth="2" />
          <path d="M 50 300 Q 200 280 350 300 T 550 300" stroke="#16a085" strokeWidth="3" fill="none" />
          
          {/* POI markers */}
          <circle cx="150" cy="100" r="5" fill="#e74c3c" />
          <circle cx="350" cy="190" r="5" fill="#3498db" />
          <circle cx="500" cy="225" r="5" fill="#f39c12" />
          
          {/* HUD overlay for Agent mode */}
          {mode === 'Agent' && (
            <>
              <circle cx="150" cy="100" r="50" fill="none" stroke="#0f0" strokeWidth="2" opacity="0.5" />
              <line x1="150" y1="50" x2="150" y2="0" stroke="#0f0" strokeWidth="2" />
              <text x="155" y="15" fill="#0f0" fontSize="12">TARGET-A</text>
            </>
          )}
        </svg>
          </div>

          <div className="hud-panel">
        <div className="stat-bars">
          <div className="stat">
            <span className="stat-label">VISIBILITY DEPTH</span>
            <svg width="200" height="20">
              <rect width="200" height="20" fill="#333" />
              <rect width={mode === 'Unauthenticated' ? '60' : mode === 'Authenticated' ? '150' : '200'} height="20" fill={mode === 'Agent' ? '#2ecc71' : mode === 'Authenticated' ? '#3498db' : '#e74c3c'} />
              <text x="100" y="14" fill="#fff" fontSize="12" textAnchor="middle">
                {mode === 'Unauthenticated' ? '30%' : mode === 'Authenticated' ? '75%' : '100%'}
              </text>
            </svg>
          </div>
          <div className="stat">
            <span className="stat-label">DETECTION ACCURACY</span>
            <svg width="200" height="20">
              <rect width="200" height="20" fill="#333" />
              <rect width={mode === 'Unauthenticated' ? '80' : mode === 'Authenticated' ? '170' : '200'} height="20" fill={mode === 'Agent' ? '#2ecc71' : mode === 'Authenticated' ? '#3498db' : '#f39c12'} />
              <text x="100" y="14" fill="#fff" fontSize="12" textAnchor="middle">
                {mode === 'Unauthenticated' ? '40%' : mode === 'Authenticated' ? '85%' : '100%'}
              </text>
            </svg>
          </div>
        </div>
        <div className="log-area">
          <div className="log-header">📋 ACTIVITY LOG</div>
          <div className="log-content">
            {logs.slice(-8).map((log, i) => (
              <div key={i} className="log-entry">
                &gt; {log}
              </div>
            ))}
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}

export default App
