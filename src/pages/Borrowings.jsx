import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'

function Borrowings() {
  const [borrowings, setBorrowings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBorrowings = async () => {
      setLoading(true)
      setError('')

      try {
        const { data: borrowData, error: borrowError } = await supabase
          .from('borrowings')
          .select('*')

        if (borrowError) {
          throw borrowError
        }

        const bookIds = borrowData?.map((item) => item.book_id) || []
        const memberIds = borrowData?.map((item) => item.member_id) || []

        const [booksResult, membersResult] = await Promise.all([
          bookIds.length
            ? supabase.from('books').select('id, title').in('id', bookIds)
            : Promise.resolve({ data: [] }),
          memberIds.length
            ? supabase.from('members').select('id, name').in('id', memberIds)
            : Promise.resolve({ data: [] }),
        ])

        if (booksResult.error) {
          throw booksResult.error
        }

        if (membersResult.error) {
          throw membersResult.error
        }

        const booksMap = new Map((booksResult.data || []).map((book) => [book.id, book.title]))
        const membersMap = new Map((membersResult.data || []).map((member) => [member.id, member.name]))

        const combined = (borrowData || []).map((item) => ({
          ...item,
          book_title: booksMap.get(item.book_id) || 'Unknown Book',
          member_name: membersMap.get(item.member_id) || 'Unknown Member',
        }))

        setBorrowings(combined)
      } catch (fetchError) {
        console.error('Fetch borrowings error:', fetchError)
        setError('Unable to load borrowing records. Please check the borrowings table and related data.')
      } finally {
        setLoading(false)
      }
    }

    fetchBorrowings()
  }, [])

  return (
    <div className="page-card">
      <h1>Borrowings</h1>

      {loading && <p>Loading borrowing records...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && borrowings.length === 0 && (
        <p className="empty-state">No borrowing records found.</p>
      )}

      {!loading && !error && borrowings.length > 0 && (
        <div className="member-table-wrap">
          <table className="member-table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Member Name</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
              </tr>
            </thead>
            <tbody>
              {borrowings.map((item) => (
                <tr key={item.id}>
                  <td>{item.book_title}</td>
                  <td>{item.member_name}</td>
                  <td>{item.borrow_date || 'N/A'}</td>
                  <td>{item.return_date || 'Not Returned'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Borrowings
