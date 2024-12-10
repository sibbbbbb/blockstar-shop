'use client'

import React from 'react'
import Image from 'next/image'
import NewsSlider from '@/components/ui/NewsSlider'
import TimeLeft from '@/components/ui/TimeLeft'

export default function Home () {
  return (
    <div className='relative h-screen-dvh w-screen overflow-hidden bg-black text-white'>
      <NewsSlider />
      <div className='absolute top-16 md:top-[45%] w-full flex flex-col md:flex-row items-center justify-start md:justify-center gap-x-40 gap-y-4'>
        <div className='relative w-[12rem] md:w-[8rem] h-[12rem] md:h-[8rem]'>
          <Image
            src='/logos/blockstar-white.svg'
            alt='Blockstar'
            fill
          />
        </div>
        <TimeLeft />
        <div className='flex flex-row items-start md:items-center justify-between gap-x-5 my-4 md:my-0 text-lg bg-white text-black w-[22rem] md:w-[25rem] h-24 md:h-10 py-1 px-4 rounded-sm cursor-pointer'>
          <span className='text-xl md:text-base font-bold'>unite al club</span>
          <div className='relative w-[2rem] md:w-[1rem] h-[2rem] md:h-[1rem]'>
            <Image
              src='/icons/arrow-right.svg'
              alt='Blockstar'
              fill
            />
          </div>
        </div>
      </div>
      <div className='absolute text-white bottom-0 right-0'>
        <div className='relative h-[15rem] sm:h-[20rem] md:h-[30rem] w-[15rem] sm:w-[20rem] md:w-[30rem]'>
          <Image
            src='/logos/blockstar-black.svg'
            alt='Blockstar logo'
            fill
          />
        </div>
      </div>
    </div>
  )
}
