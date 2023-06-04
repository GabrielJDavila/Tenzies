export function flipShow(setShowScoreboard, showScoreboard) {
    setShowScoreboard(prevShow => !prevShow)
    if(showScoreboard) {
      window.location.reload()
    }
}

export function addToScoreboard(userData, savedData, setSavedData) {
    let data = userData
    const updatedData = [...savedData, data]
    localStorage.setItem("data", JSON.stringify(updatedData))
    setSavedData(updatedData)
    console.log(savedData)
}

export function setUser(e, setUserData) {
    const {name, value} = e.target
    setUserData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
}