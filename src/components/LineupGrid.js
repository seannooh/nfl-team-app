import React from 'react'
import TeamCard from './TeamCard'

function LineupGrid({ lineup, handleAssignPosition }) {
  return (
    <div className='lineup-grid'>
      {Object.entries(lineup).map(([position, team]) => (
        <div 
          className='lineup-item'
          key={position}
          onClick={() => handleAssignPosition(position)}
        >
          <h3>{position}</h3>
          <TeamCard currentTeam={team} />
        </div>
      ))}
    </div>
  )
}

export default LineupGrid