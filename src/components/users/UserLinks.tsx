"use client"

import { useUserStore } from '@/store';
import Link from 'next/link'
import React from 'react'

interface Props {
  onClose?: () => void;
}

export const UserLinks = ({onClose}:Props) => {
  const islogged = useUserStore(state => state.isLoggedIn)

  return (
    <div>
      {
        islogged ? (
          <Link href="/profile" onClick={onClose}>Perfil</Link>
        ) : (
          <Link href='/auth/login' onClick={onClose}>Log in</Link>
        )
      }
    </div>
  )
}