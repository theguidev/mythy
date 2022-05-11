import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLandmark, faQuestionCircle, faScroll, faGear, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'


export default function Home() {
  const [showAside, setShowAside] = useState(false);
  const [wordSubmited, setWordSubmited] = useState(false);
  const [rightWord, setRightWord] = useState("pente");
  const firstInput = useRef<HTMLInputElement>(null)
  const [attempts, setAttempts] = useState([{
    id: 0,
    disabled: false,
    value: '',
    inputs: [
      {
        id: 0,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 1,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 2,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 3,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 4,
        value: '',
        rightPlace: false,
        exists: false,
      },
    ]
  },
  {
    id: 1,
    disabled: true,
    value: '',
    inputs: [
      {
        id: 0,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 1,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 2,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 3,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 4,
        value: '',
        rightPlace: false,
        exists: false,
      },
    ]
  },
  {
    id: 2,
    disabled: true,
    value: '',
    inputs: [
      {
        id: 0,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 1,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 2,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 3,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 4,
        value: '',
        rightPlace: false,
        exists: false,
      },
    ]
  },
  {
    id: 3,
    disabled: true,
    value: '',
    inputs: [
      {
        id: 0,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 1,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 2,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 3,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 4,
        value: '',
        rightPlace: false,
        exists: false,
      },
    ]
  },
  {
    id: 4,
    disabled: true,
    value: '',
    inputs: [
      {
        id: 0,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 1,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 2,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 3,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 4,
        value: '',
        rightPlace: false,
        exists: false,
      },
    ]
  },
  {
    id: 5,
    disabled: true,
    value: '',
    inputs: [
      {
        id: 0,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 1,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 2,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 3,
        value: '',
        rightPlace: false,
        exists: false,
      },
      {
        id: 4,
        value: '',
        rightPlace: false,
        exists: false,
      },
    ]
  },
]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: number, attemptId: number) => {
    e.preventDefault()
    const newAttempts = [...attempts];
    const attemptToUpdate = attempts.find(attempt => attempt.id === attemptId);
    const inputToUpdate = attemptToUpdate.inputs.find(input => input.id === id);

    const {key} = e
    const nextInput = e?.currentTarget.nextElementSibling as HTMLInputElement;
    const prevInput = e?.currentTarget.previousElementSibling as HTMLInputElement;

    if(key === "Enter") {
      const canBeSubmited = attemptToUpdate.inputs.every(input => input.value)
      if(canBeSubmited) {
        handleSubmit(attemptToUpdate, newAttempts, attemptId, e)
      } 
    }

    if((!key.match(/^[a-zA-Z]$/) && (key !== "Backspace" && key !== "ArrowLeft" && key !== "ArrowRight"))) return e.preventDefault()
  
    const newInput = {
      ...inputToUpdate,
      value: key,
    }

    switch (key) {
      case 'Backspace':
        prevInput?.focus()
        newInput.value = ""
        break
      case 'ArrowLeft':
        prevInput?.focus()
        newInput.value = inputToUpdate.value
        break
      case 'ArrowRight':
        nextInput?.focus()
        newInput.value = inputToUpdate.value
      default: 
        nextInput?.focus();
    }

    attemptToUpdate.inputs.splice(id, 1, newInput);
    newAttempts.splice(attemptId, 1, attemptToUpdate);

    setAttempts(newAttempts);
  }

  const handleSubmit = (attemptToUpdate, newAttempts, attemptId, e) => {
    let word = "";
    
    const newInputs = attemptToUpdate.inputs.map((input, index) => {
      word = word.concat(input.value);
      if(rightWord[index] === input.value) {
        return {
          ...input,
          rightPlace: true,
        }
      } else if (rightWord.includes(input.value)) {
        return {
          ...input,
          exists: true,
        }
      } else {
        return {
          ...input
        }
      }
    });
    const nextAttempt = newAttempts.find(attempt => attempt.id === attemptId + 1);
    const nextAttemptIndex = newAttempts.findIndex(attempt => attempt.id === attemptId + 1);
    if(word !== rightWord) nextAttempt.disabled = false;
    attemptToUpdate.disabled = true;
    attemptToUpdate.inputs = newInputs;
    attemptToUpdate.value = word;
    
    console.log(newAttempts, attemptToUpdate)

    newAttempts.splice(attemptId, 1, attemptToUpdate);
    newAttempts.splice(nextAttemptIndex, 1, nextAttempt);
    console.log(newAttempts, attemptToUpdate)

    setAttempts(newAttempts);
    
  }

  useEffect(() => {
    firstInput.current?.focus()
  }, [firstInput])

  return (
    <div>
      <Head>
        <title>Mythy</title>
      </Head>
      <header>
          <ul className={styles.ul}>
              <div>
                  <li onClick={() => setShowAside(!showAside)}><FontAwesomeIcon icon={faLandmark} /></li>
                  <li><FontAwesomeIcon icon={faCircleQuestion} /></li>
              </div>
              <h1>Mythy</h1>
              <div>
                  <li><FontAwesomeIcon icon={faScroll} /></li>
                  <li><FontAwesomeIcon icon={faGear} /></li>
              </div>
          </ul>
      </header>

      {showAside && 
        <aside className={styles.icon_nav}>
            <nav>
              <p>Olá. Seja bem vindo(a) ao Mythy:<br/> Um jogo web para quem gosta das ciências humanas. <br/> Tente adivinhar o deus(a) do dia de hoje.<br/><br/> Mitologias incluídas:<br/> - Egípcia<br/> - Grega<br/> - Hindu<br/> - Japonesa<br/> - Nórdica<br/> - Miscelânicas (monoteístas e outras religiões menores) </p>
            </nav>  
        </aside>
      }

      <section className={styles.guess}>
          <div className={styles.form}>
            {attempts.map((attempt) => {  
              return attempt.inputs.map((input, index) => (
                <input 
                  ref={(input.id === 0 && !attempt.disabled) ? firstInput : null} 
                  disabled={attempt.disabled}
                  maxLength={1} 
                  onKeyDown={(e) => handleKeyDown(e, input.id, attempt.id)} 
                  key={input.id} 
                  value={input.value}
                  className={input.rightPlace ? styles.correct : input.exists ? styles.letterExists : (!attempt.value && attempt.disabled) && styles.disabled }
                /> // onChange={(e) => handleChange(input.id, attempt.id, e)}
              ))
            })}
          </div>
      </section>
    </div>
  )
}