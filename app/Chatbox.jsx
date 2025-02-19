import React from 'react'
import styles from "./page.module.css";

const Chatbox = ({from, language, children}) => {
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
            }}>Language detected: '{language}'</span>
        </p>
    </div>
  )
}

export default Chatbox