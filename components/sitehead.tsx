import React from 'react'
import UserCard from './usercard'
import Link from 'next/link'

const sitehead = () => {
  return (
    <div className='h-full overflow-hidden flex flex-row'>
        <img src="taskforge.svg" className='h-full float-left' />

        <div className='m-auto h-full w-96 items-end flex'>
            <Link href="/" className='active:bg-slate-500 bg-slate-800 border border-purple-400 px-2 rounded-md'>Dashboard</Link>
            <Link href="/projects" className='active:bg-slate-500 bg-slate-800 border border-purple-400 px-2 rounded-md'>Projects</Link>
        </div>

        <div className='float-right h-full'>
            <UserCard />
        </div>

    </div>
  )
}

export default sitehead