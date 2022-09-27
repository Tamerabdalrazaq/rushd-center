import styles from 'styles/listsection.module.css'
import WordsListItem from './WordsListItem'

function ListsSection({ lists, updateLists }) {
   return (
      <div className={`${styles.wrapper} ccter`}>
         <div className={styles.content}>
            <div className={styles.secTitle}>
               <h2> All Lists </h2>
            </div>
            <div className={styles.listsGrid}>
               {lists?.map((list) => (
                  <WordsListItem
                     key={list._id}
                     list={list}
                     updateLists={updateLists}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

export default ListsSection
