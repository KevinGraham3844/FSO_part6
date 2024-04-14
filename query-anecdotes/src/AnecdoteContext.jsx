/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { createContext, useReducer } from 'react'

const anecdoteReducter = (state, action) => {
    switch (action.type) {
      case "CREATE": 
        return action.payload
      case "VOTE":
        return action.payload
      case "ERROR":
        return action.payload
      case "RESET": 
        return 'noAction'
      default:
        return 'noAction'
    }
  }
  

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
    const [anecdoteAction, anecdoteActionDispatch] = useReducer(anecdoteReducter, 'noAction')

    return (
        <AnecdoteContext.Provider value={ [anecdoteAction, anecdoteActionDispatch] }>
            {props.children}
        </AnecdoteContext.Provider>
    )
}

export const useAnecdoteValue = () => {
    const anecdoteAndDispatch = useContext(AnecdoteContext)
    return anecdoteAndDispatch[0]
}

export const useAnecdoteDispatch = () => {
    const anecdoteAndDispatch = useContext(AnecdoteContext)
    return anecdoteAndDispatch[1]
}


export default AnecdoteContext