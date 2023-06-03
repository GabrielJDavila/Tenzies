
export default function Scoreboard(props) {
    return (
        <div>
            <h1 className="scoreboard-title">Scoreboard</h1>
            <div className="scoreboard-container">
                <p>name</p>
                <p>time</p>
                <p>rolls</p>
                <p>spot</p>
            </div>
            <button className="backToGame" onClick={props.flipShow}>back to game</button>
        </div>
    )
}