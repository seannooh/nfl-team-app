import React from 'react'

function TeamCard({ currentTeam }) {
  if (!currentTeam) {
    return <div className='team-card'></div>
  }
  
  return (
    <div className='team-card'>
      <img 
        src={currentTeam.logo}
        alt={currentTeam.name}
      />
      {currentTeam.name}
    </div>
  )
}

export default TeamCard