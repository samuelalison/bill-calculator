import React from 'react'



const Friends = ({ children }) => {

  return (
    <div className='flex items-center'>
        <div>
        <img className='rounded-full' src="https://i.pravatar.cc/50" alt="" />
        </div>
        <div>
            <p>Clark</p>
            <p className='text-red-700'>{children}</p>
        </div>
        <div>
            <button className='bg-yellow-600 p-2 rounded-md'>Select</button>
        </div>
    </div>
  )
}

export default Friends