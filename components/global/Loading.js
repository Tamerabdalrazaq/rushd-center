import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";

function Loading() {
    return (
        <div className='ccter' style={{height: '100%'}}>
            <PropagateLoader color="#3f51b5" />
        </div>
    )
}

export default Loading
