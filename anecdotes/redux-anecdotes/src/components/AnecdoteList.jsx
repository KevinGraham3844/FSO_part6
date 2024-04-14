import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { updateVotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if ( state.filter === 'ALL') {
            return [...state.anecdotes].sort((a, b) => a.votes - b.votes)
        }
        return [...state.anecdotes]
            .filter(anecdote => 
                anecdote.content
                    .toLowerCase()
                    .includes(state.filter.toLowerCase()))
            .sort((a, b) => a.votes - b.votes)
    })
    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(updateVotes(id))
        dispatch(setNotification(`you voted '${content}'`, 5))
    }


    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
      )}
        </div>
    )
}

export default AnecdoteList