import Image from "next/image";
import styles from "./page.module.css";
import Chatbox from "./Chatbox"

export default function Home() {
  return (
    <main className={styles.page}>
      <header>
        <h1>AYSCRIPT AI</h1>
      </header>
      <section className={styles.chatContainer}>
        <Chatbox from="user">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo asperiores odit, corrupti impedit
            saepe rem alias sint sequi laudantium laboriosam voluptates velit ratione quidem unde! Quo dolor 
            tempore recusandae iure!
        </Chatbox>
        <Chatbox from="ai">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo asperiores odit, corrupti impedit
            saepe rem alias sint sequi laudantium laboriosam voluptates velit ratione quidem unde! Quo dolor 
            tempore recusandae iure!
        </Chatbox>
        <Chatbox from="user">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo asperiores odit, corrupti impedit
            saepe rem alias sint sequi laudantium laboriosam voluptates velit ratione quidem unde! Quo dolor 
            tempore recusandae iure!
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo asperiores odit, corrupti impedit
            saepe rem alias sint sequi laudantium laboriosam voluptates velit ratione quidem unde! Quo dolor 
            tempore recusandae iure!
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo asperiores odit, corrupti impedit
            saepe rem alias sint sequi laudantium laboriosam voluptates velit ratione quidem unde! Quo dolor 
            tempore recusandae iure!
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo asperiores odit, corrupti impedit
            saepe rem alias sint sequi laudantium laboriosam voluptates velit ratione quidem unde! Quo dolor 
            tempore recusandae iure!
        </Chatbox>
      </section>
      <section className={styles.inputContainer}>
        <textarea name="input" id="input">

        </textarea>
        <div className={styles.btnContainer}>
          <button>Convert</button>
          <button>Copy</button>
        </div>
      </section>
    </main>
  );
}
