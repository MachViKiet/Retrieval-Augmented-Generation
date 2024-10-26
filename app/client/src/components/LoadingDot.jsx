import React from 'react'
import theme from '~/theme'

function LoadingDot() {
  return (
    <div className='flex space-x-1 justify-center items-center dark:invert' style={{ 
        height: 'fit-content',
        width: 'fit-content',
        paddingLeft: 0,
        paddingTop: 7,
        paddingBottom: 5,
        paddingRight: 5,
        borderRadius: '15px'
        }}>
        <span className='sr-only'>Loading...</span>
        <div className='h-1 w-1 bg-black dark:bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-1 w-1 bg-black dark:bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-1 w-1 bg-black dark:bg-white rounded-full animate-bounce'></div>
    </div>
  )
}

export default LoadingDot
