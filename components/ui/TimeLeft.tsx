import React, { useEffect, useState } from 'react'

export default function TimeLeft () {
  const [timeLeft, setTimeLeft] = useState('')

  const targetDate: any = new Date('2024-12-20T20:00:00')

  const calculateTimeLeft = () => {
    const now: any = new Date()
    const difference = targetDate - now

    if (difference <= 0) return 'Bienvenido al club'

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

    return () => clearInterval(interval) // Limpiar intervalo al desmontar el componente
  }, [])

  return (
  <div className='flex items-center justify-center text-white text-2xl font-semibold gap-x-4 font-helvetica'>
    <span>[</span>
    <span> {timeLeft}</span>
    <span>]</span>
  </div>
  )
}
