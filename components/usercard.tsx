import React from 'react'
import {getImgUrl} from "@/lib/gravatar"

interface user {
  email: string;
  username: string;
  primaryTeam: string;
}

const userDetails: user = {email: "zack@lima3.me",username:"Lima3",primaryTeam:"Lima3 Concepts"}

const UserCard = () => {
  return (
    <div className='h-full w-100 border border-red-800 w-48 lg:w-64 overflow-hidden justify-center'>
      <img src={getImgUrl(userDetails.email)} className='m-auto h-3/4 hidden: sm:block' />
    
      <div className='text-green-400 px-2 w-full text-nowrap mt-2 text-xl flex justify-center align-middle'>
        {userDetails.username} 
        <img src="downarrow.svg" className='w-4 h-4 my-auto' />
      </div>
    </div>
  )
}

export default UserCard