import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page-card home-page">
      <h1>Library Management System</h1>
      <p className="page-description">A simple library management application connected to Supabase.</p>

      <div className="home-actions">
        <Link to="/" className="nav-button active">Home</Link>
        <Link to="/books" className="nav-button">Books</Link>
        <Link to="/members" className="nav-button">Members</Link>
        <Link to="/borrowings" className="nav-button">Borrowings</Link>
      </div>
    </div>
  )
}

export default Home
