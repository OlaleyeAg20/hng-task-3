// import Image from "next/image";
"use client";
import styles from "./page.module.css";
import Chatbox from "./Chatbox";
import { useEffect, useRef, useState, createContext } from "react";
import { detectLanguage } from "./aifunctions";

const CharacterContext = createContext();

export default function Home() {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const [previousInput, setPreviousInput] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [targetLanguage, setTargetLanguage] = useState("ru");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const otMeta = document.createElement("meta");
    otMeta.httpEquiv = "origin-trial";
    otMeta.content = process.env.NEXT_PUBLIC_CHROME_TOKEN;
    document.head.append(otMeta);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <CharacterContext.Provider
      value={{
        characterCount,
        targetLanguage,
        setTargetLanguage,
        sourceLanguage,
        setSourceLanguage,
        previousInput,
        setPreviousInput,
        chats,
        setChats,
        loading,
        setLoading,
      }}
    >
      <main className={styles.page}>
        <header>
          <h1>🤖 AYSCRIPT AI 🤖</h1>
        </header>
        <section className={styles.chatContainer} ref={scrollRef}>
          {loading === false
            ? chats.map((chat, index) => (
                <Chatbox
                  key={index}
                  index={index}
                  from={chat.from}
                  language={chat.language}
                >
                  {chat.message}
                </Chatbox>
              ))
            : [
                ...chats.map((chat, index) => (
                  <Chatbox
                    key={index}
                    index={index}
                    from={chat.from}
                    language={chat.language}
                  >
                    {chat.message}
                  </Chatbox>
                )),
                <div key="loading" className={styles.chatBoxFromAI}>
                  Loading please wait...
                </div>,
              ]}
        </section>
        <section className={styles.inputContainer}>
          <textarea
            name="input"
            id="input"
            onChange={(e) => {
              setPreviousInput(e.target.value);
              setInput(e.target.value);
            }}
            value={input}
          ></textarea>
          <div className={styles.btnContainer}>
            <button
              onClick={() => {
                setLoading(true);
                if (input) {
                  detectLanguage(input)
                    .then((detector) => {
                      if (detector) {
                        detector.detect(input).then((result) => {
                          setCharacterCount(input.length);
                          setChats([
                            ...chats,
                            {
                              from: "user",
                              message: input,
                              language: result[0].detectedLanguage,
                            },
                          ]);
                          setSourceLanguage(result[0].detectedLanguage);
                        });
                      } else {
                        alert("Language detector not available!");
                      }

                      setLoading(false);
                    })
                    .catch(() => {
                      alert(
                        "An error occured it seems the chrome inbuilt AI is not available on your chrome or your device does not support it!"
                      );
                      setLoading(false);
                    });
                }

                setInput("");
              }}
            >
              SEND
            </button>
          </div>
        </section>
      </main>
    </CharacterContext.Provider>
  );
}

export { CharacterContext };
