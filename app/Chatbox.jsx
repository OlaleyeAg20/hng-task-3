import styles from "./page.module.css";
import { CharacterContext } from "./page";
import { useContext, forwardRef } from "react";
import { translateText, summarize } from "./aifunctions";

const Chatbox = forwardRef(({ from, language, children, index, indexedBy }, ref) => {
  const character = useContext(CharacterContext);

  const scrollToMessage = () => {
    if (character.refs.current[indexedBy]) {
      character.refs.current[indexedBy].scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        character.refs.current[indexedBy].style.transform = 'scale(0.8)';
      }, 500)
      setTimeout(() => {
        character.refs.current[indexedBy].style.transform = 'scale(1)';
      }, 1000)
    }
  };

  return (
    <div
      ref={ref}
      style={
        from === "user"
          ? { alignSelf: "flex-end", background: "#333", color: "#f2f2f2" }
          : null
      }
      className={from === "user" ? styles.chatBox : styles.chatBoxFromAI}
    >
      <p className={styles.from}>
        Message from {from === "user" ? "you" : "AI"}
      </p>

      {character.chats[indexedBy]?.message ? (
        <div className={styles.replyoverlay} onClick={scrollToMessage}>
          <p>{character.chats[indexedBy]?.message > 150 ? character.chats[indexedBy]?.message.slice(0, 150) + '...' : character.chats[indexedBy]?.message}</p>
        </div>
      ) : null}
      <p>
        {children}
        {from === "user" ? (
          <span
            style={{
              fontSize: "0.7rem",
              display: "block",
              textAlign: "right",
              marginTop: "0.5rem",
              color: "#ccc",
            }}
          >
            Language detected: {language === "en" ? "English" : language}
          </span>
        ) : null}
      </p>
      {from === "user" ? (
        <div className="chatBtnContainer">
          <select
            name="language"
            value={character.targetLanguage}
            onChange={(e) => {
              character.setTargetLanguage(e.target.value);
            }}
          >
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
            <option value="tr">Turkish</option>
            <option value="fr">French</option>
          </select>
          <button
            value={index}
            onClick={(e) => {
              character.setLoading(true);
              translateText(
                character.chats[e.target.value].message,
                language,
                character.targetLanguage
              )
                .then((res) => {
                  if (res) {
                    character.setChats([
                      ...character.chats,
                      { from: "ai", message: res, indexedBy: e.target.value },
                    ]);
                  }
                  character.setLoading(false);
                })
                .catch((error) => {
                  alert(error);
                  character.setLoading(false);
                });
            }}
          >
            Translate
          </button>
          {children.length >= 150 ? (
            <button
              value={index}
              onClick={(e) => {
                character.setLoading(true);
                summarize(character.chats[e.target.value].message)
                  .then((res) => {
                    if (res) {
                      character.setChats([
                        ...character.chats,
                        { from: "ai", message: res, indexedBy: e.target.value },
                      ]);
                    }
                    character.setLoading(false);
                  })
                  .catch((error) => {
                    alert(error);
                    character.setLoading(false);
                  });
              }}
            >
              Summarize
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});

export default Chatbox;