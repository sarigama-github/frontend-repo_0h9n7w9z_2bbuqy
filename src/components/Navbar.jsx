import { Film, Search, UploadCloud } from 'lucide-react'

export default function Navbar({ onOpenUpload, onSearch }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-tr from-indigo-500 to-fuchsia-500 shadow-md shadow-indigo-500/20">
            <Film className="w-6 h-6 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-white font-extrabold tracking-tight text-xl">MOVIEPLACE</p>
            <p className="text-xs text-indigo-200/80">Your world of movies & shows</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 w-[40%]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search titles, genres, tags..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-slate-800/70 text-slate-100 placeholder:text-slate-400 rounded-lg pl-10 pr-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:opacity-95 active:opacity-90 transition"
          >
            <UploadCloud className="w-4 h-4" />
            Upload
          </button>
        </div>
      </div>
    </header>
  )
}
