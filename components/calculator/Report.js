import React from 'react'
import styles from '../../styles/report.module.css'
import {getDate} from '../../utils/helpers'

function Report({ data, hideReport }) {
    const { sectionsScores, finalScores } = data;
    const {qScore, vScore, eScore} = sectionsScores
    return (
        <div data-name={'parent'} className={`${styles.wrapper} ccter`} 
        onClick={(e) => (e.target.dataset.name === 'parent') && hideReport()}>
            <div className={`${styles.fullReport}`}>
                <div className={`${styles.content} ccter`}>
                    <section className={styles.sectionRight}>
                        <div className={styles.generalInfo}>
                            <ul>
                                <li>
                                    <h4>ציונים בבחינה</h4>
                                    <h4 style={{fontWeight: '700'}}>פסיכומטרית</h4>
                                </li>
                                <li>
                                    <h4>שהייתה בתאריך: </h4>
                                    <h4>{getDate()}</h4>
                                </li>
                                <li>
                                    <h4>בשפה: </h4>
                                    <h4>ערבית</h4>
                                </li>
                            </ul>
                        </div>
                        <br />
                        <div className={styles.sectionsScores}>
                            <ul>
                                <li>
                                    <h3>אנגלית: </h3>
                                    <h3>{eScore}</h3>
                                </li>
                                <li>
                                    <h3>מילילי:</h3>
                                    <h3>{vScore}</h3>
                                </li>
                                <li>
                                    <h3>כמותי:</h3>
                                    <h3>{qScore}</h3>
                                </li>
                            </ul>
                        </div>
                        <br />
                        <div className={styles.calculations}>
                            <ul>
                                <li>
                                    <h3>רב תחומי:</h3>
                                    <h3>{finalScores.gFinal}</h3>
                                </li>
                                <li>
                                    <h3>בדגש מילולי:</h3>
                                    <h3>{finalScores.vFinal}</h3>
                                </li>
                                <li>
                                    <h3>בדגש כמותי:</h3>
                                    <h3>{finalScores.qFinal}</h3>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className={styles.sectionLeft}>
                        <div className={styles.leftcontent}>
                            <h3 style={{color: '#454545', fontWeight: '900'}}>سنوضّح بعض النقاط المهمّة:</h3>
                            <br/>
                            <ol type='1'>
                                <li>سلّم العلامات في كلّ واحد من مجالات الامتحان الثلاثة يتراوح بين 50 و150.</li>
                                <li>سلّم العلامات السّيكومتريّة يتراوح بين 200 و800 .تحسب العلامات بناءًا على
                                    العلامات في المجالات الثلاثة الّتي يتركّب منها الامتحان.
                                </li>
                                <li>
                                    الفوارق بين مواعيد الامتحان المختلفة، بين اللغات المختلفة وبين الصيغ المختلفة
                                    لا تؤثّر على العلامة.
                                </li>
                            </ol>
                            <br />
                            <p>
                                العلامة الموزونة للامتحان، التي تُستخدم للفرز والقبول، تُحدَّد من قِبَل مؤسّسات الدراسة
                                العليا ويمكن أن تتغيّر بما يُلائم مجالات الدراسة المختلفة في المؤسّسات.
                                <br />
                                مثلاً،
                            </p>
                            <br />
                            <div className={styles.leftScores}>
                                <ul>
                                علامتك العامّة المتعدّدة المجالات (كمّي %40 ،كلاميّ %40 ،إنكليزيّة %20) هي <span className={styles.bold}>{finalScores.gFinal}</span>
                                </ul>
                                <br/>
                                <ul>
                                علامتك العامّة بتأكيد المجال الكلامي(كلاميّ %60 ،كمّي %20 ،إنكليزيّة %20) هي <span className={styles.bold}>{finalScores.vFinal}</span>
                                </ul>
                                <br />
                                <ul>
                                علامتك العامّة بتأكيد المجال الكمّي(كمّي %60 ،كلاميّ %20 ،إنكليزيّة %20) هي <span className={styles.bold}>{finalScores.qFinal}</span>
                                </ul>
                            </div>
                            <br/>
                            <hr />
                            <br/>
                            <p>
                                لكل مؤسسة للدراسة العليا الحريّة في أن تزن العلامات كما ترغب بذلك لكلّ مجال دراسي
                                وأن تعطي لكلّ مجال من مجالات الامتحان وزنًا آخر مختلفًا من الأوزان المذكورة
                                أعلاه.كذلك، بوسع كلّ مؤسسة أن تُحدّد علامة واحدة تستخدمها في كلّ مجالات الدراسة.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Report
