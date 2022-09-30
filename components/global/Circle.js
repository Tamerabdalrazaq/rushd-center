import React from 'react'

function Circle({color}) {
  return (
    <div style={{...styles.circle, backgroundColor: color}}></div>
  )
}

const styles = {
    wrapper: {
        flexDirection: 'column'
    },
    circle: {
        width: '.8em',
        height: '.8em',
        borderRadius: '50%',
        margin: '0 .4em'
    }
}


export default Circle