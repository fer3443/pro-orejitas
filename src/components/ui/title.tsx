import { titleFont } from '@/config/fonts';
import React from 'react';

interface Props {
  title:string;
  subtitle?:string;
  className?: string;
}

export const Title = ({title, subtitle, className}:Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1 className={`${titleFont.className} antialiased text-2xl font-semibold my-3`}>{title}</h1>

      {
        subtitle && (
          <h3 className='md:text-lg/6 mb-7 font-semibold text-gray-700'>{subtitle}</h3>
        )
      }
    </div>
  )
}