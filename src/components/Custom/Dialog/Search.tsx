"use client"
import React from 'react'
import { CiSearch } from 'react-icons/ci'
import SearchCard from './SearchCard'

function Search() {
  return (
    <>
        <div className=' flex flex-row  mt-3 py-1 px-2'>
            <CiSearch className=' bg-none left-0 text-2xl top-2' />
            <input type="text" name="search" className='bg-transparent pl-6 text-lg grow focus:outline-none focus:border-none' id="search" placeholder='Search Documents Here' />
        </div>
            <hr className='mb-2'/>

            {
                [1,2,3].map((item,index)=>{
                    return <SearchCard document={{}} key={index}/>
                })
            }
    </>
  )
}

export default Search