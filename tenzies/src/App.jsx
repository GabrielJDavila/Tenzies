import { useState, useEffect } from 'react'
import Die from "./Die"
import Scoreboard from './Scoreboard'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [savedData, setSavedData] = useState([])
  const [showScoreboard, setShowScoreboard] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if(!tenzies) {
        setSeconds(prevSec => prevSec + 1)
        if(seconds === 59) {
          setMinutes(prevMin => prevMin + 1)
          setSeconds(0)
        }
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  useEffect(() => {
    const data = localStorage.getItem("data")
    if(data) {
      setSavedData(data)
      console.log(data.score)
    }
  }, [])

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const checkValue = dice.every(die => die.value === firstValue)
    if(allHeld && checkValue) {
      setTenzies(true)
    }
  }, [dice])
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    let randomNumbers = []
    for(let i = 0; i < 10; i++){
      randomNumbers.push(generateNewDie())
    }
    return randomNumbers
  }

  function rollNewDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
      setRolls(oldRolls => oldRolls + 1)
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setRolls(0)
      setSeconds(0)
      setMinutes(0)
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id? {
        ...die,
        isHeld: !die.isHeld
      } :
      die
    }))
  }

  const dieElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDice(die.id)}
    />
  ))
  
  function flipShow() {
    setShowScoreboard(prevShow => !prevShow)
    if(showScoreboard) {
      window.location.reload()
    }
  }

  function addToScoreboard() {
    const score = {
      timeMin: minutes,
      timeSec: seconds,
      rollCount: rolls
    }
    localStorage.setItem("data", score)
  }

  return (
    <div>
      {
      !showScoreboard &&
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">{tenzies ? "You Won!" : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
        <div className="rolls-timer-container">
          <p className="rolls">Rolls: {rolls}</p>
          <p className="timer">Time: {minutes < 10 && 0}{minutes}:{seconds < 10 && 0}{seconds}</p>
          <button className="scoreboard-btn" onClick={flipShow}>Scoreboard</button>
        </div>
        <div className="main-div">
          {dieElements}
        </div>
        <div className="bottom-btns-container">
          <button onClick={rollNewDice} className="roll-dice">{tenzies ? "New Game" : "Roll New Dice"}</button>
          {tenzies && <button onClick={addToScoreboard}>Add to scoreboard</button>}
        </div>
      </main>
      }
      {
        showScoreboard &&
        <Scoreboard
          flipShow={flipShow}
        />
        }
    </div>
  )
}

export default App
