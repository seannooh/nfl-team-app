import React from 'react'

function Team({ currentTeam, onLogoClick, isRolling }) {
  const logoSrc = currentTeam
    ? currentTeam.logo
    : 'https://upload.wikimedia.org/wikipedia/en/a/a2/National_Football_League_logo.svg';

  const logoAlt = currentTeam
    ? currentTeam.name 
    : 'Click to spin';

  const displayText = isRolling
    ? 'Spinning...'
    : currentTeam
    ? currentTeam.name 
    : 'Click the logo to spin';

  return (
    <div className='team'>
      <img
        src={logoSrc}
        alt={logoAlt}
        onClick={isRolling ? null : onLogoClick}
      />
      <p>{displayText}</p>
    </div>
  )
}

export default Team