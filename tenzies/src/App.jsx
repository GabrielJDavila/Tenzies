import { useState, useEffect } from 'react'
import Die from "./Die"
import Timer from "./Timer"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)

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
      // setTenzies(false)
      // setDice(allNewDice())
      // setRolls(0)
      window.location.reload()
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

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">{tenzies ? "You Won!" : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
      <div className="rolls-timer-container">
        <p className="rolls">{rolls}</p>
        <p className="timer">{minutes < 10 && 0}{minutes}:{seconds < 10 && 0}{seconds}</p>
      </div>
      <div className="main-div">
        {dieElements}
      </div>
      <button onClick={rollNewDice} className="roll-dice">{tenzies ? "New Game" : "Roll New Dice"}</button>
    </main>
  )
}

export default App
