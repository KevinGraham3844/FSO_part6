import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    return state.notification
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={notification === 'NONE' ? { display:'none' } : style}>
      {notification}
    </div>
  )
}

export default Notification