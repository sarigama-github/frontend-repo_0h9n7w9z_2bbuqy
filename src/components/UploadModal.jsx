import { useState } from 'react'
import { X } from 'lucide-react'

export default function UploadModal({ open, onClose, onUploaded }) {
  const [form, setForm] = useState({
    title: '',
    type: 'movie',
    description: '',
    year: '',
    genres: '',
    rating: '',
    duration_minutes: '',
    episodes: '',
    poster_url: '',
    video_url: '',
    tags: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      title: form.title.trim(),
      type: form.type,
      description: form.description.trim() || undefined,
      year: form.year ? Number(form.year) : undefined,
      genres: form.genres ? form.genres.split(',').map((g) => g.trim()).filter(Boolean) : [],
      rating: form.rating ? Number(form.rating) : undefined,
      duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : undefined,
      episodes: form.episodes ? Number(form.episodes) : undefined,
      poster_url: form.poster_url || undefined,
      video_url: form.video_url || undefined,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : []
    }

    try {
      const res = await fetch(`${backend}/api/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      await res.json()
      onUploaded()
      onClose()
      setForm({
        title: '', type: 'movie', description: '', year: '', genres: '', rating: '',
        duration_minutes: '', episodes: '', poster_url: '', video_url: '', tags: ''
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-slate-900 border border-white/10 rounded-xl w-full max-w-2xl p-6 text-white relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-300 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-2xl font-bold mb-2">Upload Content</h3>
        <p className="text-slate-300 mb-4">Add a new title to your library.</p>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full bg-slate-800/70 border border-white/10 rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm mb-1">Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full bg-slate-800/70 border border-white/10 rounded px-3 py-2">
              <option value="movie">Movie</option>
              <option value="drama">Drama</option>
              <option value="cartoon">Cartoon</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Year</label>
            <input name="year" value={form.year} onChange={handleChange} type="number" className="w-full bg-slate-800/70 border border-white/10 rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm mb-1">Rating (0-10)</label>
            <input name="rating" value={form.rating} onChange={handleChange} type="number" min="0" max="10" step="0.1" className="w-full bg-slate-800/70 border border-white/10 rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm mb-1">Duration (min)</label>
            <input name="duration_minutes" value={form.duration_minutes} onChange={handleChange} type="number" className="w-full bg-slate-800/70 border border-white/10 rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm mb-1">Episodes</label>
            <input name="episodes" value={form.episodes} onChange={handleChange} type="number" className="w-full bg-slate-800/70 border border-white/10 rounded px-3 py-2" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Genres (comma separated)</label>
            <input name="genres" value={form.genres} onChange={handleChange} className="w-full bg-slate-800/70 border border-white/10 rounded px-3 py-2" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Tags (comma separated)</label>
            <input name="tags" value={form.tags} onChange={handleChange} className="w-full bg-slate-800/70 border border-white/10 rounded px-3 py-2" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Poster URL</label>
            <input name="poster_url" value={form.poster_url} onChange={handleChange} className="w-full bg-slate-800/70 border border-white/10 rounded px-3 py-2" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Video/Trailer URL</label>
            <input name="video_url" value={form.video_url} onChange={handleChange} className="w-full bg-slate-800/70 border border-white/10 rounded px-3 py-2" />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600">Cancel</button>
            <button disabled={loading} className="px-4 py-2 rounded bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:opacity-95 disabled:opacity-60">
              {loading ? 'Uploading...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
