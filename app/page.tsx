'use client'

import React, { useState, ChangeEvent  } from 'react'
import Image from 'next/image'
import NewsSlider from '@/components/ui/NewsSlider'
import TimeLeft from '@/components/ui/TimeLeft'
import { putEmail } from '@/api/registerEmail'

export default function Home () {
  const [showError, setShowError] = useState<boolean>(false)
  const [send, setSend] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [showInput, setShowInput] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const mail = e.target.value;
    setEmail(mail)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setShowError(false)
      setSend(false)
      
      if (!email.includes('@')) setShowError(true)

      await putEmail(email)
      setSend(true)
    }
    catch (e) {
      setShowError(true)
    }
  }

  return (
    <div className='relative h-screen-dvh w-screen overflow-hidden bg-black text-white'>
      <NewsSlider />
      <div className='absolute top-16 md:top-[45%] w-full flex flex-col md:flex-row items-center justify-start md:justify-center gap-x-40 gap-y-4'>
        <div className='relative w-[12rem] md:w-[8rem] h-[12rem] md:h-[8rem]'>
          <Image
            src='/logos/B RELLENO.svg'
            alt='Blockstar'
            fill
          />
        </div>
        <TimeLeft />
        {
          showInput
            ? (
              <form onSubmit={handleSubmit}>
                <div className='flex flex-row items-start md:items-center justify-between gap-x-5 my-4 md:my-0 text-lg bg-white text-black w-[22rem] md:w-[25rem] h-24 md:h-10 py-1 px-4 rounded-sm'>
                  <input
                    type='text' placeholder='tu mail' value={email}
                    onChange={handleChange} name="email" id='mail' className='w-full h-full text-xl md:text-base font-bold focus:outline-none'
                  />
                  <button type='submit' className='flex items-center justify-center w-10 h-full cursor-pointer'>
                    <div className='relative w-[2rem] md:w-[1rem] h-[2rem] md:h-[1rem]'>
                      <Image
                        src='/icons/arrow-right.svg'
                        alt='Blockstar'
                        fill
                      />
                    </div>
                  </button>
                </div>
                {
                  showError && (<span className="text-[10px] text-red-500">Ingresa un mail valido</span>)
                }
                {
                  send && (<span className="text-[10px] text-green-500">Mail registrado correctamente</span>)
                }
              </form>
              )
            : (
              <div className='flex flex-row items-start md:items-center justify-between gap-x-5 my-4 md:my-0 text-lg bg-white text-black w-[22rem] md:w-[25rem] h-24 md:h-10 py-1 px-4 rounded-sm cursor-pointer' onClick={() => setShowInput(true)}>
                <span className='text-xl md:text-base font-bold'>unite al club</span>
                <div className='relative w-[2rem] md:w-[1rem] h-[2rem] md:h-[1rem]'>
                  <Image
                    src='/icons/arrow-right.svg'
                    alt='Blockstar'
                    fill
                  />
                </div>
              </div>
              )
        }
      </div>
      <div className='absolute text-white -bottom-64 -right-48'>
        <div className='relative h-[15rem] sm:h-[20rem] md:h-[40rem] w-[15rem] sm:w-[20rem] md:w-[40rem]'>
          <Image
            src='/logos/B OUTLINE.svg'
            alt='Blockstar logo'
            fill
          />
        </div>
      </div>
    </div>
  )
}
