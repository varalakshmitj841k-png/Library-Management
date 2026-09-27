function BookCard({ book }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Category:</strong> {book.category || 'General'}
      </p>
      <span className={book.available ? 'status available' : 'status unavailable'}>
        {book.available ? 'Available' : 'Not Available'}
      </span>
    </div>
  )
}

export default BookCard
