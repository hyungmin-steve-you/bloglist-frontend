import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [show, setShow] = useState(false)

  const handleClick = (event) => {
    setShow(!show)
  }

  useImperativeHandle(ref, () => {
    return {
      handleClick
    }
  })

  return (
    <div>
      {show === false
        ? <div>
          <button onClick={handleClick}>{props.buttonLabel}</button>
        </div>
        :
        <div>
          {props.children}
          <button onClick={handleClick}>Hide</button>
        </div>
      }
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable