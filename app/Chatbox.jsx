import styles from "./page.module.css";
import { CharacterContext } from "./page";
import { useContext, useEffect } from "react";
import { translateText, summarize } from "./aifunctions";
// import { useEffect } from "react";

const Chatbox = ({from, language, children, index}) => {

  const character = useContext(CharacterContext)



  return (
    <div style={from === 'user' ? {alignSelf: 'flex-end', background: '#333', color: '#f2f2f2'} : null} className={from === 'user' ? styles.chatBox : styles.chatBoxFromAI}>
        <p>
            {children}
            {from === 'user' ?
            <span style={{
                fontSize: '0.7rem',
                display: 'block',
                textAlign: 'right',
                marginTop: '0.5rem',
                color: '#ccc'
            }}>Language detected: {language === 'en' ? 'English' : language}</span> : null
          }
        </p>
        {
        from === 'user' ?
          <div className='chatBtnContainer'>
          <select name="language" value={character.targetLanguage} onChange={e => {
          character.setTargetLanguage(e.target.value)
        }}>
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
            <option value="tr">Turkish</option>
            <option value="fr">French</option>
          </select>
          <button value={index} onClick={(e) => {
            character.setLoading(true)
              translateText(character.chats[e.target.value].message, language, character.targetLanguage)
                .then(res => {
                  character.setChats([...character.chats, { from: "ai", message: res,}]);
                  character.setLoading(false)
                })
                .catch(error => {
                  alert(error)
                  character.setLoading(false)
                })
                
          }}>Translate</button>
          {
            children.length >= 150 ?
            <button value={index} onClick={(e) => {
              character.setLoading(true)                
              summarize(character.chats[e.target.value].message)
                .then(res => {
                  if(res){
                    character.setChats([...character.chats, { from: "ai", message: res,}]);
                  }
                  character.setLoading(false)
                })
                .catch(error => {
                  alert(error)
                  character.setLoading(false)
                })
            }}>Summerize</button> : null
          }
        </div> : null}
    </div>
  )
}

export default Chatbox