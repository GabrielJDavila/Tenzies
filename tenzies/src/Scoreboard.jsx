
export default function Scoreboard(props) {
    
    const users = props.data.map(user => <p>{user.name}</p>)
    const userTime = props.data.map(user => <p>{user.min} : {user.sec}</p>)
    const userRolls = props.data.map(user => <p>{user.rolls}</p>)
    
    return (
        <div>
            <h1 className="scoreboard-title">Scoreboard</h1>
            <div className="scoreboard-container">
                <div className="names-column">
                    <p>Name</p>
                    {users}
                </div>
                <div className="time-column">
                    <p>Time</p>
                    {userTime}
                </div>
                <div className="rolls-column">
                    <p>Rolls</p>
                    {userRolls}
                </div>
                <div className="spot-column"></div>
                
            </div>
            <button className="backToGame" onClick={props.flipShow}>back to game</button>
        </div>
    )
}