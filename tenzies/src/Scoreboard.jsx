
export default function Scoreboard(props) {
    
    const sortedData = [...props.data].sort((a, b) => {
        if(a.min === b.min) {
            return a.sec - b.sec
        } else {
            return a.min - b.min
        }
    })

    const users = sortedData.map(user => <p key={user.name}>{user.name}</p>)
    const userTime = sortedData.map(user => <p key={user.name}>{user.min < 10 && 0}{user.min} : {user.sec < 10 && 0}{user.sec}</p>)
    const userRolls = sortedData.map(user => <p key={user.name}>{user.rolls}</p>)
    const rank = sortedData.map((user, index) => (
        <p key={user.name} className="rank">{index + 1}</p>
    ))

    return (
        <div className="scoreboard-component">
            <h1 className="scoreboard-title">Scoreboard</h1>
            <div className="scoreboard-container">
                <div className="names-column">
                    <p className="column-title">Name</p>
                    {users}
                </div>
                <div className="time-column">
                    <p className="column-title">Time</p>
                    {userTime}
                </div>
                <div className="rolls-column">
                    <p className="column-title">Rolls</p>
                    {userRolls}
                </div>
                <div className="rank-column">
                    <p className="column-title">Rank</p>
                    {rank}
                </div>
                
            </div>
            <button className="backToGame" onClick={props.flipShow}>back to game</button>
        </div>
    )
}