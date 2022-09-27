import React from 'react'
import styles from '../../styles/tasjeel.module.css'

function AboutUsQuote() {
   return (
      <div className={styles.paragraphWrapper}>
         <div className={styles.topQuote}>،،</div>
         <div className={styles.bottomQuote}>،،</div>
         <p className={styles.p}>
            تقدم مبادرة رُشد الطلابية خدمات دروس خصوصية في العديد من المواضيع
            التعليمية بمختلف المراحل. <br></br>تأخذ المبادرة على عاتقها مسؤولية
            الكفاح مع الطالب العربيّ في الداخل الفلسطيني هادفةً لسدِّ الفجوات
            التعليمية الموجودة ومرافقتِه الى آكادميات التعليم العالي، داخل
            البلاد وخارجها. <br></br> يعمل في الطاقم التدريسي مُرشدون ذوو شغف
            وخبرة عاليين في التعليم، منهم الطلاب والخريجون في جامعات البلاد.
         </p>
      </div>
   )
}

export default AboutUsQuote
