import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import BookCard from '../components/BookCard'
import AddBook from '../components/AddBook'

function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchBooks = async () => {
    setLoading(true)
    setError('')

    if (!supabase) {
      setError('Add your Supabase URL and anon key in .env before loading books.')
      setLoading(false)
      return
    }

    try {
      const { data, error: fetchError } = await supabase.from('books').select('*')

      if (fetchError) {
        throw fetchError
      }

      setBooks(data || [])
    } catch (fetchError) {
      console.error('Fetch books error:', fetchError)
      setError('Unable to load books right now. Please check your Supabase setup and table names.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <div className="page-card">
      <h1>Books</h1>

      <AddBook onBookAdded={fetchBooks} />

      <div className="books-section">
        {loading && <p>Loading books...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && books.length === 0 && (
          <p className="empty-state">No books found in the database.</p>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="book-grid">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Books
