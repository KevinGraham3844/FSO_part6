import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteOnAnecdote } from './requests'

import AnecdoteContext from './AnecdoteContext'
import { useAnecdoteValue, useAnecdoteDispatch } from './AnecdoteContext'


const App = () => {

  const anecdoteAction = useAnecdoteValue()
  const anecdoteActionDispatch = useAnecdoteDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      anecdoteActionDispatch({
        type: 'ERROR',
        payload: error.response.data.error
      })
      setTimeout(() => {
        anecdoteActionDispatch('RESET')
      }, 5000)
    }
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteOnAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    anecdoteActionDispatch({
      type: 'VOTE',
      payload: `anecdote '${anecdote.content}' voted`
    })
    setTimeout(() => {
      anecdoteActionDispatch({ type: 'RESET' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    if (result.error.message === 'Network Error') {
      return <div>anecdote service not available due to problems in server</div>
    }
  }

  const anecdotes = result.data

  return (
    <AnecdoteContext.Provider value={[anecdoteAction, anecdoteActionDispatch]}>
      <h3>Anecdote app</h3>
      <Notification stateOfAnecdote={anecdoteAction}/>
      <AnecdoteForm 
        anecdoteMutationFunction={newAnecdoteMutation} 
      />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </AnecdoteContext.Provider>
  )
}

export default App
