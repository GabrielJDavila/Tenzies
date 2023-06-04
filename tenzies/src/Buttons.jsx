export default function Buttons(props) {
    return (
        <div className="bottom-btns-container">
          <button onClick={props.rollNewDice} className="roll-dice">{props.tenzies ? "New Game" : "Roll New Dice"}</button>
          {props.tenzies &&
          <div className="user-info">
            <input
              type="text"
              className="username"
              placeholder="enter name (5 char. max)"
              name="name"
              maxLength="5"
              value={props.userData.name}
              onChange={props.handleSetUser}
            >
            </input>
            <button
                className="add-to-scoreboard-btn"
                onClick={props.handleAddToScoreboard}
            >
              Add to scoreboard
            </button>
          </div>
          }
        </div>
    )
}