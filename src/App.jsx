import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Grid from './components/Grid'
import UploadModal from './components/UploadModal'

function App() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const [activeType, setActiveType] = useState('all')
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchItems = async () => {
    const params = new URLSearchParams()
    if (query) params.append('q', query)
    if (activeType !== 'all') params.append('type', activeType)
    const res = await fetch(`${backend}/api/content?${params.toString()}`)
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeType])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar onOpenUpload={() => setOpen(true)} onSearch={setQuery} />
      <Hero />
      <Grid items={items} activeType={activeType} onTypeChange={setActiveType} />
      <UploadModal open={open} onClose={() => setOpen(false)} onUploaded={fetchItems} />
      <footer className="py-10 text-center text-slate-400">© {new Date().getFullYear()} MOVIEPLACE</footer>
    </div>
  )
}

export default App
