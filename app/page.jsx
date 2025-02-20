// import Image from "next/image";
'use client';
import styles from "./page.module.css";
import Chatbox from "./Chatbox";
import { useEffect, useRef, useState, createContext } from "react";
import { detectLanguage } from "./aifunctions";


const CharacterContext = createContext()

export default function Home() {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const [characterCount, setCharacterCount] = useState(0)
  // const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null)

  const scrollToBottom = () => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats])

  return (
    <CharacterContext.Provider value={{characterCount}}>
    <main className={styles.page}>
      <header>
        <h1>🤖 AYSCRIPT AI 🤖</h1>
      </header>
      <section className={styles.chatContainer} ref={scrollRef}>
        {chats.map((chat, index) => (
          <Chatbox key={index} from={chat.from} language={chat.language}>
            {chat.message}
          </Chatbox>
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
                    setCharacterCount(input.length)
                    setChats([...chats, { from: "user", message: input, language: result[0].detectedLanguage }]);
                    scrollTo(0,0)
                  });
                }
              });
              setInput("");
            }}
          >SEND</button>
        </div>
      </section>
    </main>
    </CharacterContext.Provider>
  );
}


export { CharacterContext }