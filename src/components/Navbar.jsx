import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">Library Management System</div>
      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/members">Members</NavLink>
        <NavLink to="/borrowings">Borrowings</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
