import React from 'react'

function Button({text, type, onClick, className, children}) {
  return (
    <button type='button' className={`_global_button ${color_class[type]} ${className}`} onClick={onClick}>
        {text}
        {children}
    </button>
  )
}

const color_class = {
    primary: '_global_button_primary',
    reddish: '_global_button_reddish',
}

export default Button