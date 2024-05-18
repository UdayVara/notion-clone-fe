"use client"
import { setSelected } from '@/redux/Slice/documentsSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

function SearchCard({toggle,document}:{toggle:any,document:any}) {
  const dispatch = useDispatch()
  return (
    <>
        <h4 className='bg-slate-100 dark:bg-neutral-800 rounded my-2 py-2 text-md px-2 cursor-pointer hover:bg-neutral-700' onClick={()=>{
          dispatch(setSelected(document?.id));toggle(false);
        }}>{document.title}</h4>
    </>
  )
}

export default SearchCard