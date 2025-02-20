import styles from "./page.module.css";
import { CharacterContext } from "./page";
import { useContext, useEffect } from "react";

const Chatbox = ({from, language, children}) => {

  const characterLength = useContext(CharacterContext)

  return (
    <div style={from === 'user' ? {alignSelf: 'flex-end', background: '#333', color: '#f2f2f2'} : null} className={styles.chatBox}>
        <p>
            {children}
            <span style={{
                fontSize: '0.7rem',
                display: 'block',
                textAlign: 'right',
                marginTop: '0.5rem',
                color: '#ccc'
            }}>Language detected: {language === 'en' ? 'English' : language}</span>
        </p>
        <div className='chatBtnContainer'>
          <select name="language" id="">
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
            <option value="tr">Turkish</option>
            <option value="fr">French</option>
          </select>
          <button>Translate</button>
          {
            characterLength.characterCount >= 150 ?
            <button>Summerize</button> : null
          }
        </div>
    </div>
  )
}

export default Chatbox