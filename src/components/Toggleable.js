import React, { useState } from 'react'

const Toggleable = props => {
  const [show, setShow] = useState(false)

  const handleClick = (event) => {
    setShow(!show)
  }

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
}

export default Toggleable