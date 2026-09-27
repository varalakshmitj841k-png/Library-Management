import { useState } from 'react'
import { supabase } from '../supabase/client'

function AddBook({ onBookAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.title.trim() || !formData.author.trim()) {
      setError('Please enter a book title and author.')
      setMessage('')
      return
    }

    if (!supabase) {
      setMessage('')
      setError('Add your Supabase URL and anon key in .env before adding a book.')
      return
    }

    try {
      const { error: insertError } = await supabase.from('books').insert([
        {
          title: formData.title.trim(),
          author: formData.author.trim(),
          category: formData.category.trim() || null,
        },
      ])

      if (insertError) {
        throw insertError
      }

      setFormData({ title: '', author: '', category: '' })
      setError('')
      setMessage('Book added successfully!')

      if (onBookAdded) {
        onBookAdded()
      }
    } catch (insertError) {
      setMessage('')
      setError('Unable to add the book. Please check your Supabase setup.')
      console.error('Add book error:', insertError)
    }
  }

  return (
    <div className="add-book-panel">
      <h2>Add a New Book</h2>
      <form className="add-book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Book Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </div>

        <button type="submit" className="primary-button">
          Add Book
        </button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default AddBook
