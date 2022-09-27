import React from 'react'

function WordCategory({ text, color, value }) {
    return (
        <div className='ccter' style={styles.wrapper}>
            <div className="ccter">
                <div style={{...styles.circle, backgroundColor: color}}></div>
                <h5>{value}</h5>
            </div>
            <h4 style={{color}}>{text}</h4>
        </div>
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

export default WordCategory
