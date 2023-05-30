import { useState } from 'react'
import Die from "./Die"
import { nanoid } from 'nanoid'
function App() {

  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    let randomNumbers = []
    for(let i = 0; i < 10; i++){
      let randomNum = Math.ceil(Math.random() * 6)
      randomNumbers.push({
        value: randomNum,
        isHeld: false,
        id: nanoid()
      })
    }
    return randomNumbers
  }

  function rollNewDice() {
    setDice(allNewDice())
  }

  function holdDice(id) {
    console.log(id)
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
      <div className="main-div">
        {dieElements}
      </div>
      <button onClick={rollNewDice} className="roll-dice">Roll New Dice</button>
    </main>
  )
}

export default App
