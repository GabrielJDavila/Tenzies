export default function Gamedata(props) {
    return (
        <div className="rolls-timer-container">
          <p className="rolls">Rolls: {props.userData.rolls}</p>
          <p className="timer">Time: {props.userData.min < 10 && 0}{props.userData.min}:{props.userData.sec < 10 && 0}{props.userData.sec}</p>
          <button className="scoreboard-btn" onClick={props.flipShow}>Scoreboard</button>
        </div>
    )
}