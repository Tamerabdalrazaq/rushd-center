import React from 'react'
import styles from '../../styles/tasjeel.module.css'

function UserInput({ value, type, placeholder, onChange }) {
   return (
         <input
            className={styles.formInput}
            type={type}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            value={value}
         />
   )
}

export default UserInput
