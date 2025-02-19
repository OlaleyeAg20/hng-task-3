// import Image from "next/image";
'use client';
import styles from "./page.module.css";
import Chatbox from "./Chatbox";
import { useState } from "react";
import { detectLanguage } from "./aifunctions";




export default function Home() {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  // const [loading, setLoading] = useState(false);

  return (
    <main className={styles.page}>
      <header>
        <h1>🤖 AYSCRIPT AI 🤖</h1>
      </header>
      <section className={styles.chatContainer}>
        {chats.map((chat, index) => (
          <Chatbox key={index} from={chat.from} language={chat.language}>{chat.message}</Chatbox>
        ))}
      </section>
      <section className={styles.inputContainer}>
        <textarea name="input" id="input" onChange={(e) => {
          setInput(e.target.value)
          }} 
          value={input}>

        </textarea>
        <div className={styles.btnContainer}>
          <button
            onClick={() => {
              
              detectLanguage(input).then((detector) => {
                if (detector) {
                  detector.detect(input).then((result) => {
                    
                    setChats([...chats, { from: "user", message: input, language: result[0].detectedLanguage }]);
                    
                  });
                }
              });
              setInput("");
            }}
          >SEND</button>
        </div>
      </section>
    </main>
  );
}
