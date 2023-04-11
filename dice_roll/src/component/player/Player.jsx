import './Player.css'

export default function Player(props){


return(

<div className="container">
    <h1>{props.player} <br/> {props.PlayerPoints}</h1>
    <br/><br/><br/><br/><br/><br/><br/>

    {!props.Win&&!props.Lose&&<h3>&nbsp;</h3>}
    {props.Win&&<h3 className="win" >&nbsp;&nbsp;You Win!</h3>} 
    {props.Lose&&<h3 className="lose">&nbsp;&nbsp;You Lose!</h3>} 
    <div className="box">
    <h2>CURRENT <br/><br/>  {props.CurrentPoints}</h2>
    </div>
    <br/><br/>
</div>
)}