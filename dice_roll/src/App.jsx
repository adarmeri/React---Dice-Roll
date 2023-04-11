import { useState , useEffect  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Popup from './component/popup/Popup'
import Player from './component/player/Player'
import Sound from './music/backMusic(64 kbps).mp3'
import SoundCube from './music/Cube(64 kbps).mp3'

function App() {

  const [Player1Score, setPlayer1Score] = useState(0);
  const [Player2Score, setPlayer2Score] = useState(0);

  const [Player1Win , setPlayer1Win] = useState(false);
  const [Player2Win , setPlayer2Win] = useState(false);
  const [Player1Lose , setPlayer1Lose] = useState(false);
  const [Player2Lose , setPlayer2Lose] = useState(false);

  const [AIMode , setAIMode] = useState(false);
  const [MusicOn , setMusicOn] = useState(true);

  const [ButtonPopup,setButtonPopup] = useState(true);
  const [PlayTurn,setPlayTurn] = useState(true);
  const [winningScore,setwinningScore] = useState(1);
  const [Player1Points , setPlayer1Points] = useState(0);
  const [Player1CurrentPoints , setPlayer1CurrentPoints] = useState(0);
  const [Player2Points , setPlayer2Points] = useState(0);
  const [Player2CurrentPoints , setPlayer2CurrentPoints] = useState(0);

  const [Img, setImg] = useState(["./src/img/dice-1.png","./src/img/dice-2.png","./src/img/dice-3.png"
  ,"./src/img/dice-4.png","./src/img/dice-5.png","./src/img/dice-6.png"]);
  const[GotSixSix,SetGotSixSix] = useState(false);
  
  


  function roll()
  {
  const num1 = 1+Math.floor(Math.random() * 6) ,num2= 1+Math.floor(Math.random() * 6),count=0;
  new Audio(SoundCube).play();
  if(num1==6&&num2==6)
  {
  if(PlayTurn)setPlayer1CurrentPoints(0);
  else setPlayer2CurrentPoints(0);
  }
  
  if(num1+num2==12){
        SetGotSixSix(true);
            setTimeout(() => {
             SetGotSixSix(GotSixSix => !GotSixSix);
            }, 1000);
    }

  document.getElementById("img1").src=`./src/img/dice-${num1}.png`;
  document.getElementById("img2").src=`./src/img/dice-${num2}.png`;
  return num1+num2;
}


  function isAwinner()
  {
    if(Player1Points+Player1CurrentPoints>winningScore || Player2Points+Player2CurrentPoints==100)
    {
      setPlayer2Win(true);
      setPlayer1Lose(true);
      setPlayer1Score(Player1Score => Player1Score+1);
    }
    else if(Player2Points+Player2CurrentPoints>winningScore || Player1Points+Player1CurrentPoints==100)
    {
      setPlayer1Win(true);
      setPlayer2Lose(true);
      setPlayer2Score(Player2Score => Player2Score+1);
    }

    setPlayer1CurrentPoints(0);
    setPlayer2CurrentPoints(0);
  }

  function newGame()
  {
    if(MusicOn) {new Audio(Sound).play();}
    setButtonPopup(true);
    setPlayer1CurrentPoints(0);setPlayer1Points(0);setPlayer1Win(false);setPlayer1Lose(false);
    setPlayer2CurrentPoints(0);setPlayer2Points(0);setPlayer2Win(false);setPlayer2Lose(false);
    setMusicOn(false);
  }

 
 function aI()
  {
    let x = 1+Math.floor(Math.random() * 4),i=1;
    console.log(x);
    while(x!=4)
    {
      setTimeout(() => {
        setPlayer2CurrentPoints(Player2CurrentPoints=>Player2CurrentPoints+roll());
      }, 1000*i++);
        x = 1+Math.floor(Math.random() * 4);
  
    }
    setTimeout(() => {
      setPlayer2Points(Player2Points=>Player2Points+Player2CurrentPoints);
      setPlayTurn(PlayTurn=>!PlayTurn);

    }, i*2000);

  }
  

  return (
   
    <div>
     <h1 style={{marginRight:70}}>Wining Score {winningScore}</h1>
      <img className='imgcenter' id='img1' style={{width:60}} src={Img[5]}/>
      <img className='imgcenter1' id='img2' style={{width:60}} src={Img[5]}/><br/>
      <button className='newGame' onClick={()=>{setButtonPopup(true);newGame();play();}}> NEW GAME </button> <br/><br/>
      <button className={(Player1Win || Player2Win)?'rollDice1':'rollDice'} onClick={()=>
      (Player1Win || Player2Win)? 
      (newGame())
      :(
       PlayTurn ? ((setPlayer1CurrentPoints(Player1CurrentPoints => Player1CurrentPoints + roll())))
       :  ((setPlayer2CurrentPoints(Player2CurrentPoints => Player2CurrentPoints + roll()))))
      
      }
      > ROLL DICE </button> <br/><br/>

      <button className={(Player1Win || Player2Win)?'hold1':'hold'} onClick={()=>(Player1Win || Player2Win)? 
      (newGame())
      :(
        setPlayer1Points(Player1Points=>Player1Points+Player1CurrentPoints),
        !AIMode ? setPlayer2Points(Player2Points=>Player2Points+Player2CurrentPoints):"",
        setPlayTurn(!PlayTurn),
        isAwinner(),
        (AIMode && PlayTurn)?(aI())
        :"")
      }> HOLD </button> <br/><br/>
      <h1 className='totalScore1'>Score:{Player1Score}</h1> <h1 className='totalScore2'>Score:{Player2Score}</h1>
      <Player player={PlayTurn ? "PLAYER1_Turn":"Player1"} CurrentPoints={Player1CurrentPoints} PlayerPoints={Player1Points} Win={Player1Win} Lose={Player1Lose}/>
      <Player player={AIMode?(PlayTurn?'AI':'AI_Turn'):PlayTurn?'PLAYER2':"PLAYER2_Turn"} CurrentPoints={Player2CurrentPoints} PlayerPoints={Player2Points} Win={Player2Win} Lose={Player2Lose}/>
      
      
     <Popup trigger={ButtonPopup} setTrigger={setButtonPopup} SetWining={setwinningScore} >
      <h3>Game Insturctions:</h3>
      <p style={{textAlign:'left'}}>In your turn -roll the dice (at least once) and accumulate the result in "current"<br/>
         You can roll agian or clock "Hold" to save the points from "Current" and end the turn.<br/>
         Note! if you get 6-6 you will lose all points for "Current" and the turn will go to your opponent.<br/>
         If you managed to reach exactly the target score - you win! if you passed it - you loose...<br/><br/>
         Enter  points for winning(between 1-100):<br/>
         <button className={AIMode?'onMode':'offMode'} onClick={()=>setAIMode(AIMode=>!AIMode)}>AI mode {AIMode&&"on"} {!AIMode&&"off"}</button></p>
     </Popup>
     {GotSixSix&&<><img className='img61' src="./src/img/6.png" /><img className='img62' src="./src/img/6.png" /></>}
  </div>

  )
}

export default App
