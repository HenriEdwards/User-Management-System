import './alert.css'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Alert = ({ message, duration }) => {
  // Define state variables
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Set a timer to hide the alert after a specified duration
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    // Clean up the timer when the component unmounts or when the duration changes
    return () => {
      clearTimeout(timer)
    }
  }, [duration])

  return (
    <div className={`custom-alert ${visible ? 'show' : 'hide'}`} style={{ visibility: visible ? 'visible' : 'hidden' }}>
      {/* Display the custom alert message */}
      {message}
    </div>
  )
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
}

export default Alert