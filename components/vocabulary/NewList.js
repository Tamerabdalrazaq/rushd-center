import ConfirmAction from 'components/global/ConfirmAction'
import React, { useState, useEffect, useRef } from 'react'
import styles from 'styles/components/newList.module.css'
import {
   findObjectById,
} from 'utils/helpers'

function NewList({ wordsArray, populatedWords, loading }) {
   const tableRef = useRef()
   return (
      <div className={styles}>
        <ConfirmAction actions = {{ 
            msg: "Create New List",
            action: () => null,
            setConfirmAction: () => null
        }}>
            <h3>test</h3>
        </ConfirmAction>
      </div>
   )
}

export default NewList
