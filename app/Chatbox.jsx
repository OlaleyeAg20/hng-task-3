import React from 'react'
import styles from "./page.module.css";

const Chatbox = ({from, children}) => {
  return (
    <div style={from === 'user' ? {alignSelf: 'flex-end', background: '#333', color: '#f2f2f2'} : null} className={styles.chatBox}>
        <p>
            {children}
        </p>
    </div>
  )
}

export default Chatbox