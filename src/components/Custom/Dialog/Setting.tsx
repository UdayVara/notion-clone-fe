"use client"
import React from 'react'
import { ModeToggle } from '../ModeToggler'

function Setting() {
  return (
    <>
        <div className='flex justify-between mt-3 items-center'>
            <div className='flex flex-col'>
                <h2 className='text-lg dark:text-white'>Appereance</h2>
                <h5>Customize how this looks on your Device</h5>
            </div>
            <ModeToggle />
        </div>
    </>
  )
}

export default Setting