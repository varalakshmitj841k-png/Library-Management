import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Books from './pages/Books'
import Members from './pages/Members'
import Borrowings from './pages/Borrowings'

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/members" element={<Members />} />
            <Route path="/borrowings" element={<Borrowings />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App