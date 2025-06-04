import { PetPost } from '@/interface'
import React from 'react'
import { PetsGridItem } from './PetsGridItem'

interface Props {
  pets:PetPost[]
}

export const PetsGrid = ({pets}:Props) => {
  if(pets.length === 0){
    return (
      <div className='text-center'>
        <h2 className='font-semibold text-2xl'>Ups no pudimos cargar a nuestras mascotas...</h2>
        <h3 className='text-lg'>Pronto lo solucionamos</h3>
      </div>
    )
  }
  return (
    <div className='px-4 md:px-0 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 mb-10'>
      {pets.map(pet => (
        // <span key={pet.id}>{pet.title}</span>
        <PetsGridItem pet={pet} key={pet.id}/>
      ))}
    </div>
  )
}