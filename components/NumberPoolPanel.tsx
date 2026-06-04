import { Grid3X3 } from 'lucide-react'

export function NumberPoolPanel({ poolStart, poolSize }: { poolStart?: number; poolSize?: number }) {
  const start = poolStart ?? 1
  const size = poolSize ?? 0
  const poolEnd = size > 0 ? start + size - 1 : start
  const preview = size > 0 ? Array.from({ length: Math.min(size, 24) }, (_, index) => start + index) : []

  return (
    <section className="number-pool panel panel-tight">
      <div className="panel-heading">
        <div>
          <p className="section-label">Contract Number Pool</p>
          <h2>{start.toString().padStart(3, '0')} - {poolEnd.toString().padStart(3, '0')}</h2>
        </div>
        <Grid3X3 size={22} />
      </div>
      <div className="number-grid" aria-label="Number pool preview">
        {preview.map((value) => (
          <span key={value}>{value.toString().padStart(3, '0')}</span>
        ))}
      </div>
      <p className="muted pool-note">Pool bounds are read from the deployed contract getters.</p>
    </section>
  )
}
