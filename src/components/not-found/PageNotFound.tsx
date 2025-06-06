import Link from 'next/link'
import React from 'react'

export const PageNotFound = () => {
  return (
    <div>
      <h2>404</h2>
      <h3>Página no encontrada</h3>
      <div>
        <Link href='/feed'>Regresar al Feed</Link>
      </div>
    </div>
  )
}