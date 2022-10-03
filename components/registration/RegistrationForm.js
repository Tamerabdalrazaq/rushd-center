import Option from 'components/calculator/Option'
import React from 'react'
import { useState } from 'react'
import styles from '../../styles/tasjeel.module.css'
import UserInput from '../../components/registration/UserInput'
import { sendForm } from 'utils/api/_h_form'
import Loading from 'components/global/Loading'

function RegistrationForm() {
   const [education, setEducation] = useState('high')
   const [subject, setSubject] = useState('math')
   const [name, setName] = useState('')
   const [phone, setPhone] = useState('')
   const [city, setCity] = useState('')
   const [personal_note, setPersonalNote] = useState('')
   const [api_stat, setApi_stat] = useState('steady')
   return (
      <form className={styles.formWrapper}>
         <div>
            <h1> استمارة تسجيل</h1>
         </div>
         <div className={styles.formSection}>
            <h3 className={styles.formSectionHeading}> المستوى التعليميّ </h3>
            <div className={styles.formOptions}>
               <Option
                  text={'اعدادي'}
                  isSelected={education == 'junior'}
                  value="junior"
                  onClick={setEducation}
               />
               <Option
                  text={'ثانوي'}
                  isSelected={education == 'high'}
                  value="high"
                  onClick={setEducation}
               />
               <Option
                  text={'خريج/ة'}
                  isSelected={education == 'grad'}
                  value="grad"
                  onClick={setEducation}
               />
               <Option
                  text={'جامعيّ'}
                  isSelected={education == 'college'}
                  value="college"
                  onClick={setEducation}
               />
            </div>
         </div>
         <div className={styles.formSection}>
            <h3 className={styles.formSectionHeading}> الموضوع </h3>
            <div className={styles.formOptions}>
               {formData[education].subjects.map((sub) => (
                  <Option
                     text={sub.text}
                     isSelected={subject == sub.value}
                     value={sub.value}
                     onClick={setSubject}
                     key={sub.value}
                  />
               ))}
            </div>
         </div>
         <div className={styles.formSection}>
            <h3 className={styles.formSectionHeading}> تفاصيل شخصية </h3>
            <div className={styles.userInputGrid}>
               <input
                  className={styles.formInput}
                  type="text"
                  placeholder="الاسم الكامل"
                  value={name}
                  autoComplete='name'
                  onChange={(e) => setName(e.target.value)}
               />
               <input
                  className={styles.formInput}
                  placeholder="رقم الهاتف"
                  value={phone}
                  type="number"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  autoComplete='tel'
                  onChange={(e) => setPhone(e.target.value)}
               />
               <input
                  className={styles.formInput}
                  type="text"
                  placeholder="البلد"
                  autoComplete='address-level1'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
               />
               <textarea
                  className={styles.formInput}
                  placeholder="ملاحظات شخصية"
                  value={personal_note}
                  onChange={(e) => setPersonalNote(e.target.value)}
               />
            </div>
         </div>

         <div className={styles.formSection + ' ' + styles.submitSection}>
            <button
               className={
                  styles.btn + ` ${api_stat === 'done' ? styles.green : ''}`
               }
               onClick={async (e) => {
                  e.preventDefault()
                  setApi_stat('waiting')
                  const res = await sendForm({
                     name,
                     phone,
                     city,
                     personal_note,
                     education,
                     subject,
                  })
                  if (res === true) setApi_stat('done')
                  else setApi_stat('error')
               }}
            >
               {(() => {
                  if (api_stat === 'steady') return 'تسجيل'
                  else if (api_stat === 'waiting') return <Loading />
                  else if (api_stat === 'error') return '❌حصل خطأ ما'
                  else return '👍تم'
               })()}
            </button>
         </div>
      </form>
   )
}

const formData = {
   junior: {
      subjects: [
         { text: 'لغة عربية', value: 'ar' },
         { text: 'رياضيات', value: 'math' },
         { text: 'فيزياء', value: 'physics' },
         { text: 'علم حاسوب', value: 'cs' },
         { text: 'بسيخومتري', value: 'psy' },
      ],
   },
   high: {
      subjects: [
         { text: 'لغة عربية', value: 'ar' },
         { text: 'رياضيات', value: 'math' },
         { text: 'فيزياء', value: 'physics' },
         { text: 'علم حاسوب', value: 'cs' },
         { text: 'بسيخومتري', value: 'psy' },
      ],
   },
   grad: {
      subjects: [
         { text: 'لغة عربية', value: 'ar' },
         { text: 'رياضيات', value: 'math' },
         { text: 'فيزياء', value: 'physics' },
         { text: 'علم حاسوب', value: 'cs' },
         { text: 'بسيخومتري', value: 'psy' },
      ],
   },
   college: {
      subjects: [
         { text: 'סטטסטיקה', value: 'statistics' },
         { text: 'אלגברה לינארית', value: 'linear algebra' },
         { text: 'מבוא למדעי המחשב', value: 'itcs' },
         { text: 'קורסי הכנה', value: 'prep courses' },
      ],
   },
}

export default RegistrationForm
