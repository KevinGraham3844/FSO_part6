const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const updatedGood = {
        ...state, 
        good: state.good + 1
      }
      return updatedGood
    case 'OK':
      const updatedOkay = {
        ...state,
        ok: state.ok + 1
      }
      return updatedOkay
    case 'BAD':
      const updatedBad = {
        ...state,
        bad: state.bad + 1
      }
      return updatedBad
    case 'ZERO':
      const updatedZero = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return updatedZero
    default: return state
  }

}

export default counterReducer
