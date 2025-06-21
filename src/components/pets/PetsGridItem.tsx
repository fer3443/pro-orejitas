import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { PetPost } from '@/interface';
import { typeLabel } from '@/constants/type-labels';

interface Props {
  pet:PetPost
}

export const PetsGridItem = ({pet}:Props) => {


  return (
    <div className='rounded-md overflow-hidden fade-in shadow-md'>
      <Image
      src={pet.image[0].url}
      alt={pet.title}
      className='w-full object-cover h-56'
      width={400}
      height={400}
      />
      <div className='p-4 flex flex-col gap-y-1.5'>
        <Link href={`/petpost/${pet.id}`} className='hover:text-blue-500 font-semibold'>{pet.title}</Link>
        <p className='font-semibold text-xs text-gray-800 h-12 overflow-y-hidden text-ellipsis line-clamp-3'>{pet.description}</p>
        <p className='text-xs capitalize'>Estado: <span className={clsx({
          "text-red-500": pet.type === "LOST",
          "text-green-500": pet.type === "FOUND",
          "text-yellow-500": pet.type === "ADOPTION",
        })}>{typeLabel[pet.type]}</span></p>
      </div>
    </div>
  )
}