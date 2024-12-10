'use client'

import React from 'react'
import Image from 'next/image'
import NewsSlider from '@/components/ui/NewsSlider'
import TimeLeft from '@/components/ui/TimeLeft'

export default function Home () {
  return (
    <div className='relative h-screen w-screen bg-black text-white'>
      <div className='flex flex-col md:flex-row items-center justify-start py-36 md:justify-center h-full w-full gap-x-40 gap-y-2'>
        <div className='relative w-[225px] md:w-[150px] h-[225px] md:h-[150px]'>
          <Image
            src='/logos/blockstar-white.svg'
            alt='Blockstar'
            fill
          />
        </div>
        <TimeLeft />
        <div className='flex flex-row items-center justify-between gap-x-5 my-8 md:my-0 text-lg bg-white text-black w-[25rem] h-10 py-1 px-4 rounded-sm cursor-pointer'>
          <span className='text-[14px] font-bold'>unite al club</span>
          <Image
            src='/icons/arrow-right.svg'
            alt='Blockstar'
            width={15}
            height={15}
          />
        </div>
      </div>
      <NewsSlider />
      <div className='absolute text-white bottom-0 right-0'>
        <Image
          src='/logos/blockstar-black.svg'
          alt='Blockstar logo'
          width={500}
          height={500}
        />
      </div>
    </div>
  )
}
