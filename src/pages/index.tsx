import {
  faCircleQuestion, faGear, faLandmark, faScroll
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import {
  KeyboardEvent, useCallback, useEffect, useRef, useState
} from "react";
import { mockAttempts } from "../../attempts";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [wordSubmited, setWordSubmited] = useState(false);
  const [rightWord, setRightWord] = useState("tutor");
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const aboutUsModalRef = useRef<HTMLDivElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const [attempts, setAttempts] = useState(mockAttempts);

  const handleClick = useCallback((e: any) => {
    console.log(e.target, aboutUsModalRef.current);
    if (
      aboutUsModalRef.current &&
      !aboutUsModalRef.current.contains(e.target)
    ) {
      setIsAboutUsModalOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);

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
      if (rightWord[index] === input.value) {
        return {
          ...input,
          rightPlace: true,
        };
      } else if (rightWord.includes(input.value)) {
        return {
          ...input,
          exists: true,
        };
      } else {
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
    if (word !== rightWord) nextAttempt.disabled = false;
    attemptToUpdate.disabled = true;
    attemptToUpdate.inputs = newInputs;
    attemptToUpdate.value = word;

    console.log(newAttempts, attemptToUpdate);

    newAttempts.splice(attemptId, 1, attemptToUpdate);
    newAttempts.splice(nextAttemptIndex, 1, nextAttempt);
    console.log(newAttempts, attemptToUpdate);

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
            <li onClick={() => setIsAboutUsModalOpen(true)}>
              <FontAwesomeIcon icon={faLandmark} />
            </li>
            <li>
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
      {isAboutUsModalOpen && (
        <div className={styles.modal_container}>
          <div ref={aboutUsModalRef} className={styles.modal}>
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
              Desenvolvido por <b>Guilherme Schneider</b> e{" "}
              <b>Vinícius Hack,</b> o principal objetivo do jogo é utilizar suas
              habilidades linguísticas para decifrar qual é a palavra,
              atualizada diariamente. <br />
              <br /> Porém, diferentemente dos clássicos Termo e Wordle, a
              palavra possui sempre uma relação com uma das
              <b> mitologias</b> e/ou <b>religiões</b> existentes no mundo.
            </p>
          </div>
        </div>
      )}
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
                value={input.value}
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
    </div>
  );
}
