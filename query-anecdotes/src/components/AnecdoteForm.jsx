import { useContext } from 'react'
import AnecdoteContext from '../AnecdoteContext'
import PropTypes from 'prop-types'
import { useAnecdoteDispatch } from '../AnecdoteContext'

const AnecdoteForm = ({ anecdoteMutationFunction }) => {

  const dispatch = useAnecdoteDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value    
    event.target.anecdote.value = ''
    console.log('new anecdote')
    anecdoteMutationFunction.mutate({ content, votes:0 })
    dispatch({ 
      type: "CREATE",
      payload: `anecdote '${content}' created`
    })
    setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, 5000)
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

AnecdoteForm.propTypes = {
  anecdoteMutationFunction: PropTypes.object.isRequired,
  anecdoteAction: PropTypes.func
}

export default AnecdoteForm
