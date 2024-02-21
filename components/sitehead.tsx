import React from 'react'
import UserCard from './usercard'

const sitehead = () => {
  return (
    <div className='h-full overflow-hidden'>
        <img src="taskforge.svg" className='h-full float-left' />

        <div className='float-right h-full'>
            <UserCard />
        </div>

    </div>
  )
}

export default sitehead