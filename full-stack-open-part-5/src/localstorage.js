export const loadState = () => {
  try {
    const serialisedState = localStorage.getItem('user')
    if (serialisedState === null) {
      return null
    }
    return JSON.parse(serialisedState)
  } catch (error) {
    console.error(error)
    return null
  }
}

export const saveState = (user) => {
  try {
    const serialisedState = JSON.stringify(user)
    localStorage.setItem('user', serialisedState)
  } catch (error) {
    console.error(error)
  }
}
