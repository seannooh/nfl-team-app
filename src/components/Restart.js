import React from 'react'

function Restart({ restart }) {
  return (
    <div className='restart'>
        <button className='restart-button' onClick={restart}>Restart</button>
    </div>
  )
}

export default Restart