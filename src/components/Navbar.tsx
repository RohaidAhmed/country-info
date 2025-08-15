'use client';

import { useTheme } from 'next-themes'
import Link from 'next/link'
import React from 'react'
// import { BsFillSunFill, BsMoonFill } from 'react-icons/bs';
import DarkThemeToggleBtn from './DarkThemeToggleBtn';

type Props = {}

export default function Navbar({ }: Props) {

  const { setTheme, resolvedTheme } = useTheme();
  

  function toggleTheme() {
    if (resolvedTheme === 'dark') setTheme('light');
    else if (resolvedTheme === 'light') setTheme('dark');
  }

  return (
    <div className='sticky top-0 z-50 shadow-xl dark:shadow-2xl'>
      <div className='flex justify-between  mx-auto mb-8 px-8 bg-white dark:bg-slate-900 md:px-14 py-5 items-center transition-all '>
        <Link
          href={'/'}
          className='font-bold text-xl md:text-2xl'
        >
          Where in the world?
        </Link>
        <section onClick={toggleTheme} className='cursor-pointer flex items-center p-2 md:px-4 transition-all hover:opacity-80 gap-1'>
          <DarkThemeToggleBtn />
          <div className='text-xl md:text-2xl md-1 font-semibold hidden md:block'>
          Mode
          </div>
        </section>
      </div>
    </div>
  )
}