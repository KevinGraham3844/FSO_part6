const Notification = ({ stateOfAnecdote }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (stateOfAnecdote === 'noAction') return null

  return (
    <div style={stateOfAnecdote === 'noAction' ? { display: 'none'} : style }>
      {stateOfAnecdote}
    </div>
  )
}

export default Notification
