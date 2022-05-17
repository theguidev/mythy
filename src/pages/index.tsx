import {
  faCircleQuestion,
  faGear,
  faLandmark,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { mockAttempts } from "../../attempts";
import { Modal } from "../components/Modal";
import { api } from "../services/api";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [wordSubmited, setWordSubmited] = useState(false);
  const [rightWord, setRightWord] = useState("");
  const [isModalAboutUsOpen, setIsModalAboutUsOpen] = useState(false);
  const firstInput = useRef<HTMLInputElement>(null);
  const button_helpRef = useRef<HTMLButtonElement>(null);
  const [attempts, setAttempts] = useState(mockAttempts);
  const [isModalHelpOpen, setIsModalHelpOpen] = useState(false);
  const [keys, setKeys] = useState([
    {
      value: "q",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "w",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "e",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "r",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "t",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "y",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "u",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "i",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "o",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "p",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "a",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "s",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "d",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "f",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "g",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "h",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "j",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "k",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "l",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "z",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "x",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "c",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "v",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "b",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "n",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
    {
      value: "m",
      wasTyped: false,
      isOnWord: false,
      rightPlace: false,
    },
  ]);

  const getWord = useCallback(async () => {
    const { data } = await api.get("/word");
    const word: string = data.word;
    setRightWord(word);
  }, []);

  useEffect(() => {
    getWord();
  }, [getWord]);

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    id: number,
    attemptId: number
  ) => {
    e.preventDefault();
    const newAttempts = [...attempts];
    const attemptToUpdate = attempts.find(
      (attempt) => attempt.id === attemptId
    );
    const inputToUpdate = attemptToUpdate.inputs.find(
      (input) => input.id === id
    );

    const { key } = e;
    const nextInput = e?.currentTarget.nextElementSibling as HTMLInputElement;
    const prevInput = e?.currentTarget
      .previousElementSibling as HTMLInputElement;

    if (key === "Enter") {
      const canBeSubmited = attemptToUpdate.inputs.every(
        (input) => input.value
      );
      if (canBeSubmited) {
        handleSubmit(attemptToUpdate, newAttempts, attemptId, e);
      }
    }

    if (
      !key.match(/^[a-zA-Z]$/) &&
      key !== "Backspace" &&
      key !== "ArrowLeft" &&
      key !== "ArrowRight"
    )
      return e.preventDefault();

    const newInput = {
      ...inputToUpdate,
      value: key,
    };

    switch (key) {
      case "Backspace":
        prevInput?.focus();
        newInput.value = "";
        break;
      case "ArrowLeft":
        prevInput?.focus();
        newInput.value = inputToUpdate.value;
        break;
      case "ArrowRight":
        nextInput?.focus();
        newInput.value = inputToUpdate.value;
      default:
        nextInput?.focus();
    }

    attemptToUpdate.inputs.splice(id, 1, newInput);
    newAttempts.splice(attemptId, 1, attemptToUpdate);

    setAttempts(newAttempts);
  };

  const handleSubmit = (attemptToUpdate, newAttempts, attemptId, e) => {
    let word = "";

    const newInputs = attemptToUpdate.inputs.map((input, index) => {
      word = word.concat(input.value);
      const newKeys = [...keys];
      const keyToUpdate = newKeys.find((key) => key.value === input.value);
      const keyToUpdateIndex = keys.findIndex(
        (key) => key.value === input.value
      );
      keyToUpdate.wasTyped = true;
      if (rightWord[index] === input.value) {
        keyToUpdate.rightPlace = true;
        newKeys.splice(keyToUpdateIndex, 1, keyToUpdate);
        setKeys(newKeys);
        return {
          ...input,
          rightPlace: true,
        };
      } else if (rightWord.includes(input.value)) {
        keyToUpdate.isOnWord = true;
        newKeys.splice(keyToUpdateIndex, 1, keyToUpdate);
        setKeys(newKeys);
        return {
          ...input,
          exists: true,
        };
      } else {
        newKeys.splice(keyToUpdateIndex, 1, keyToUpdate);
        setKeys(newKeys);
        return {
          ...input,
        };
      }
    });
    const nextAttempt = newAttempts.find(
      (attempt) => attempt.id === attemptId + 1
    );
    const nextAttemptIndex = newAttempts.findIndex(
      (attempt) => attempt.id === attemptId + 1
    );
    if (word !== rightWord && nextAttempt) nextAttempt.disabled = false;
    attemptToUpdate.disabled = true;
    attemptToUpdate.inputs = newInputs;
    attemptToUpdate.value = word;

    newAttempts.splice(attemptId, 1, attemptToUpdate);
    newAttempts.splice(nextAttemptIndex, 1, nextAttempt);

    setAttempts(newAttempts);
  };

  useEffect(() => {
    firstInput.current?.focus();
  }, [firstInput]);

  return (
    <div>
      <Head>
        <title>Mythy</title>
      </Head>
      <header>
        <ul className={styles.ul}>
          <div>
            <li onClick={() => setIsModalAboutUsOpen(true)}>
              <FontAwesomeIcon icon={faLandmark} />
            </li>
            <li onClick={() => setIsModalHelpOpen(true)}>
              <FontAwesomeIcon icon={faCircleQuestion} />
            </li>
          </div>
          <h1>Mythy</h1>
          <div>
            <li>
              <FontAwesomeIcon icon={faScroll} />
            </li>
            <li>
              <FontAwesomeIcon icon={faGear} />
            </li>
          </div>
        </ul>
      </header>
      <section className={styles.guess}>
        <div className={styles.form}>
          {attempts.map((attempt) => {
            return attempt.inputs.map((input, index) => (
              <input
                ref={input.id === 0 && !attempt.disabled ? firstInput : null}
                disabled={attempt.disabled}
                maxLength={1}
                onKeyDown={(e) => handleKeyDown(e, input.id, attempt.id)}
                key={input.id}
                defaultValue={input.value}
                className={
                  input.rightPlace
                    ? styles.correct
                    : input.exists
                    ? styles.letterExists
                    : !attempt.value && attempt.disabled && styles.disabled
                }
              /> // onChange={(e) => handleChange(input.id, attempt.id, e)}
            ));
          })}
        </div>
      </section>
      <section className={styles.keyboard}>
        {keys.map((key) => (
          <div
            key={key.value}
            className={
              key.rightPlace
                ? styles.correctKey
                : key.isOnWord
                ? styles.isOnWord
                : key.wasTyped
                ? styles.wasTyped
                : styles.notTyped
            }
          >
            {key.value}
          </div>
        ))}
      </section>
      {isModalAboutUsOpen && (
        <Modal onClose={() => setIsModalAboutUsOpen(false)}>
          <h2>Hey, hey, hey!</h2>
          <p>
            O <b>Mythy</b> é um projeto indie de um jogo web inspirado por{" "}
            <Link href="https://nytimes.com/wordle">
              <a>Wordle, </a>
            </Link>
            <Link href="https://term.ooo">
              <a>Termo e </a>
            </Link>
            <Link href="https://startgame.app">
              <a>Start. </a>
            </Link>
            <br />
            <br />
            Desenvolvido por <b>Guilherme Schneider</b> e <b>Vinícius Hack,</b>{" "}
            o principal objetivo do jogo é utilizar suas habilidades
            linguísticas para decifrar qual é a palavra, atualizada diariamente.{" "}
            <br />
            <br /> Porém, diferentemente dos clássicos Termo e Wordle, a palavra
            possui sempre uma relação com uma das
            <b> mitologias</b> e/ou <b>religiões</b> existentes no mundo. <br />{" "}
            <br />
            Clique{" "}
            <Link href="https://github.com/theguidev/mythy">
              <a>aqui </a>
            </Link>{" "}
            e acesse o repositório GitHub do projeto.
          </p>
        </Modal>
      )}
      {isModalHelpOpen && (
        <Modal onClose={() => setIsModalHelpOpen(false)}>
          <h2 className={styles.help_title}>Ajuda</h2>
          <h4 className={styles.help_subtitle}>Como jogar</h4>
          <div className={styles.help_img}>
            <p>Escolha uma palavra para começar o jogo:</p>
            <img src="/static/YellowExample.png" />
            <p>
              No exemplo acima, a letra T está na palavra, mas não está no lugar
              correto.
            </p>
            <img src="/static/GreenExample.png" />
            <p>
              Neste outro exemplo, percebemos que a letra R está na palavra, no
              lugar correto.
            </p>
            <img src="/static/GrayExample.png" />
            <p>E neste último exemplo, a letra U não está na palavra.</p>
          </div>
          <h4 className={styles.hint_subtitle}>Dicas</h4>
          <p className={styles.hint_text}>
            Clique no botão abaixo e resgate uma dica!
          </p>
          <div className={styles.hints}>
            <button
              ref={button_helpRef}
              onFocus={() => {
                setTimeout(() => {
                  button_helpRef.current.blur();
                }, 300);
              }}
              className={styles.hint_button}
            >
              RESGATAR DICA
            </button>
            <p className={styles.hint}>Dica: É um deus grego.</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
