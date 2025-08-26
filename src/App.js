import './App.css';
import Header from './components/Header';
import Team from './components/Team';
import { useEffect, useState } from 'react';
import LineupGrid from './components/LineupGrid';
import Restart from './components/Restart';

function App() {
  // eslint-disable-next-line
  // every 32 nfl team
  const [teams, setTeams] = useState([]);
  // current team after randomization
  const [currentTeam, setCurrentTeam] = useState(null);
  // nfl team lineup
  const [lineup, setLineup] = useState ({
    QB: null,
    HB: null, 
    WR1: null,
    WR2: null,
    WR3: null,
    TE: null,
    OL: null,
    DEF: null
  });
  // state of randomization
  const [isRolling, setIsRolling] = useState(false);
  // state of finished or unfinished lineup
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams');
        const data = await response.json();
        
        const teamList = data.sports[0].leagues[0].teams.map(t => ({
          name: t.team.displayName,
          logo: t.team.logos[0].href
        }));

        setTeams(teamList);
        console.log(teamList);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  // Spin through teams
  const handleLogoClick = () => {
    if (isRolling || isFinished) {
      return;
    }

    setIsRolling(true);
    setCurrentTeam(null);

    const interval = setInterval(() => {
      const randomTeam = teams[Math.floor(Math.random() * teams.length)];
      setCurrentTeam(randomTeam);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsRolling(false);
    }, 1500);
  }

  // assign team to position
  const handleAssignPosition = (position) => {
  if (isRolling || !currentTeam || lineup[position]) {
    return;
  }

  const updatedLineup = {
    ...lineup,
    [position]: currentTeam
  };

  setLineup(updatedLineup);
  setCurrentTeam(null);

  if (Object.values(updatedLineup).every(pos => pos !== null)) {
    setIsFinished(true);
  }
  else {
    handleLogoClick();
  }
};

  // restart the game
  const restart = () => {
    setCurrentTeam(null);
    setLineup(
      {
        QB: null,
        HB: null, 
        WR1: null,
        WR2: null,
        WR3: null,
        TE: null,
        OL: null,
        DEF: null
      }
    );
    setIsFinished(false);
  };

  return (
    <div className="App">
      <Header/>
      <Team
        currentTeam={currentTeam}
        onLogoClick={handleLogoClick}
        isRolling={isRolling}
      />
      {isFinished ? (
        <Restart restart={restart}/>
      ) : (<div/>)}
      <LineupGrid
        lineup={lineup}
        handleAssignPosition={handleAssignPosition}
      />
    </div>
  );
}

export default App;
