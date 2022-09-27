import React from 'react'
import styles from 'styles/practice.module.css'

function WordDescribtion({ word: { definitions, synonems, examples }, visible }) {
   return (
      <div className={styles.word_definitions+` ${visible? styles.visible: styles.invisible}`}>
         {visible && definitions.map((definition, i) => (
            <div className={styles.word_definition}>
               <div className={styles.definition_type}>
                  <div className={styles.definition_number}>{i+1}</div>
                  <h4 className={styles.definition_part}>{definition[0]}</h4>
               </div>
               <p className={styles.word_definition_p}>{definition[1]}</p>
               <p className={styles.word_example_p}>{examples[i][1] && `"${examples[i][1]}"`}</p>
            </div>
         ))}
      </div>
   )
}

export default WordDescribtion
