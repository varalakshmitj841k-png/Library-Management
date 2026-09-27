import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'

function Members() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true)
      setError('')

      if (!supabase) {
        setError('Add your Supabase URL and anon key in .env before loading members.')
        setLoading(false)
        return
      }

      try {
        const { data, error: fetchError } = await supabase.from('members').select('*')

        if (fetchError) {
          throw fetchError
        }

        setMembers(data || [])
      } catch (fetchError) {
        console.error('Fetch members error:', fetchError)
        setError('Unable to load members. Please check your Supabase setup and members table.')
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  return (
    <div className="page-card">
      <h1>Members</h1>

      {loading && <p>Loading members...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && members.length === 0 && (
        <p className="empty-state">No members found in the database.</p>
      )}

      {!loading && !error && members.length > 0 && (
        <div className="member-table-wrap">
          <table className="member-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Members
