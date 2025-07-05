"use client"

import { useUserStore } from '@/store';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { Logout } from '../auth/Logout';

interface Props {
  onClose?: () => void;
}

export const UserLinks = ({onClose}:Props) => {
  const islogged = useUserStore(state => state.isLoggedIn);
  const userId = useUserStore(state => state.userId);
  const pathname = usePathname();

  const isInOwnProfile = pathname === '/profile' || pathname === `/profile/${userId}`;

  if(isInOwnProfile){
    return <Logout onClose={onClose}/>
  }

  if(!islogged) {
    return <Link href='/auth/login' className='font-semibold hover:text-blue-500 transition-all' onClick={onClose}>Log in</Link>
  }

  if(pathname === '/profile'){
    return <Logout onClose={onClose}/>
  }

  return <Link href="/profile" className='font-semibold hover:text-blue-500 transition-all' onClick={onClose}>Perfil</Link>

}