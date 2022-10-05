import React from 'react'

function Button({text, type, onClick}) {
  return (
    <button className={`_global_button ${color_class[type]}`} onClick={onClick}>
        {text}
    </button>
  )
}

const color_class = {
    primary: '_global_button_primary',
    reddish: '_global_button_reddish',
}

export default Button