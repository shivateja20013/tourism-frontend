import React from 'react'

const DisplayCard = ({title, description, onClick}) => {
  return (
    <div className='card surface-50 border-round-xl p-3 m-2 flex flex-column w-20rem h-11rem cursor-pointer' onClick={()=>onClick()}>
        <div className='text-2xl'>{title}</div>
        <div className='overflow-hidden h-7rem justify-content-center text-md'>{description}</div>
    </div>
  )
}

export default DisplayCard