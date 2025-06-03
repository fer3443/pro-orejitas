import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='h-10 flex justify-center items-center text-xs font-semibold gap-2 bg-gray-50'>
      <Link href={'/feed'} className={`${titleFont.className} hover:text-blue-500`}>Proyecto Orejitas</Link>
      <span>- Fernando A.R.</span>
      <span>{new Date().getFullYear()}.</span>
    </div>
  )
}