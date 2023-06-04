import { useState, useEffect } from 'react'
import Die from "./Die"
import Scoreboard from './Scoreboard'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
function App() {
  
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [userData, setUserData] = useState({
    name: "",
    min: 0,
    sec: 0,
    rolls: 0
  })
  const [savedData, setSavedData] = useState(
    JSON.parse(localStorage.getItem("data")) || [])
  const [showScoreboard, setShowScoreboard] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if(!tenzies) {
        setUserData(prevSec => {
          return {
            ...prevSec,
            sec: prevSec.sec + 1
          }
        })
        if(userData.sec === 59) {
          setUserData(prevMin => {
            return {
              ...prevMin,
              min: prevMin.min + 1
            }
          })
          setUserData(prevSec => {
            return {
              ...prevSec,
              sec: 0
            }
          })
        }
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [userData])

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
      setUserData(oldData => {
        return {
          ...oldData,
          rolls: oldData.rolls + 1
        }
      })
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setUserData(prevData => {
        return {
          ...prevData,
          name: "",
          min: 0,
          sec: 0,
          rolls: 0
        }
      })
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
    let data = userData
    const updatedData = [...savedData, data]
    localStorage.setItem("data", JSON.stringify(updatedData))
    setSavedData(updatedData)
    console.log(savedData)
  }

  function setUser(e) {
    const {name, value} = e.target
    setUserData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
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
          <p className="rolls">Rolls: {userData.rolls}</p>
          <p className="timer">Time: {userData.min < 10 && 0}{userData.min}:{userData.sec < 10 && 0}{userData.sec}</p>
          <button className="scoreboard-btn" onClick={flipShow}>Scoreboard</button>
        </div>
        <div className="main-div">
          {dieElements}
        </div>
        <div className="bottom-btns-container">
          <button onClick={rollNewDice} className="roll-dice">{tenzies ? "New Game" : "Roll New Dice"}</button>
          {tenzies &&
          <div className="user-info">
            <input
              type="text"
              className="username"
              placeholder="enter name"
              name="name"
              value={userData.name}
              onChange={setUser}
            >
            </input>
            <button
              onClick={addToScoreboard}
            >
              Add to scoreboard
            </button>
          </div>
          }
        </div>
      </main>
      }
      {
        showScoreboard &&
        <Scoreboard
          flipShow={flipShow}
          data={savedData}
        />
        }
    </div>
  )
}

export default App
