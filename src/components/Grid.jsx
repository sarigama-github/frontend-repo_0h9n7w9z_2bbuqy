import { useMemo } from 'react'

function Card({ item }) {
  return (
    <div className="group relative rounded-xl overflow-hidden border border-white/10 bg-slate-800/40 backdrop-blur hover:shadow-2xl hover:shadow-fuchsia-500/10 transition">
      <div className="aspect-[2/3] bg-slate-900/50">
        <img src={item.poster_url || `https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg`} alt={item.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold truncate pr-2">{item.title}</h4>
          {item.rating != null && (
            <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 text-xs font-semibold">{item.rating}</span>
          )}
        </div>
        <p className="text-slate-300/80 text-xs mt-1 line-clamp-2">{item.description}</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200">{item.type}</span>
          {item.year && <span className="text-[10px] px-2 py-0.5 rounded bg-slate-500/20 text-slate-200">{item.year}</span>}
        </div>
      </div>
      <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none rounded-xl"></div>
    </div>
  )
}

export default function Grid({ items, activeType, onTypeChange }) {
  const counts = useMemo(() => {
    const c = { all: items.length, movie: 0, drama: 0, cartoon: 0, other: 0 }
    items.forEach((i) => {
      if (i.type in c) c[i.type] += 1
    })
    return c
  }, [items])

  const tabs = [
    { key: 'all', label: `All (${counts.all})` },
    { key: 'movie', label: `Movies (${counts.movie})` },
    { key: 'drama', label: `Dramas (${counts.drama})` },
    { key: 'cartoon', label: `Cartoons (${counts.cartoon})` },
    { key: 'other', label: `Other (${counts.other})` },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onTypeChange(t.key)}
            className={`px-3 py-1.5 rounded-full text-sm border ${activeType === t.key ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white border-transparent' : 'bg-slate-800/60 text-slate-200 border-white/10 hover:bg-slate-700/60'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="text-center text-slate-300/80 py-16">No content yet. Click Upload to add your first title.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {(activeType === 'all' ? items : items.filter((i) => i.type === activeType)).map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}
