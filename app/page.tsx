'use client'

import React, { useEffect, useState } from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image'
import { getNews } from '@/api/news'

type News = {
  title: any 
  date: any
}

export default function Home () {
  const [timeLeft, setTimeLeft] = useState('')
  const [news, setNews] = useState<News[]>([])

  const targetDate: any = new Date('2024-12-18T00:00:00')

  const calculateTimeLeft = () => {
    const now: any = new Date()
    const difference = targetDate - now

    if (difference <= 0) return '¡Llegamos al miércoles 18 de diciembre!'

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((difference / (1000 * 60)) % 60)
    const seconds = Math.floor((difference / 1000) % 60)

    return `${days}:${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    getNews().then((news: News[]) => {
      setNews(news)
    })
    return () => clearInterval(interval) // Limpiar intervalo al desmontar el componente
  }, [])

  return (
    <div className='relative h-screen w-screen bg-black text-white'>
      <div className='flex items-center justify-center h-full w-full gap-x-40 '>
        <Image
          src='/logos/blockstar-white.svg'
          alt='Blockstar'
          width={150}
          height={150}
        />
        <div className='flex items-center justify-center text-white text-2xl font-semibold gap-x-4 font-helvetica'>
          <span>[</span>
          <span> {timeLeft}</span>
          <span>]</span>
        </div>
        <div className='flex flex-row items-center justify-between gap-x-5 text-lg bg-white text-black w-[25rem] h-10 py-1 px-4 rounded-sm cursor-pointer'>
          <span className='text-[14px] font-bold'>lista de espera</span>
          <Image
            src='/icons/arrow-right.svg'
            alt='Blockstar'
            width={15}
            height={15}
          />
        </div>
      </div>
      <div className='absolute top-10 w-screen border-t-2 border-b-2 py-2 border-[#363636]'>
        <Marquee>
        { news.map(({ title, date }, index) => (
          <div className='flex items-center justify-center text-[#CCCCCC] font-monument uppercase' key={index}>
            <span>[</span>
            <span>{date}</span>
            <span className='mx-2'>{title}</span>
            <span>]</span>
            <span className='mx-2'>-</span>
          </div>
        )) }
        </Marquee>
      </div>
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
