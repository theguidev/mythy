import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLandmark, faQuestionCircle, faScroll, faGear, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'


export default function Home() {
  const [showAside, setShowAside] = useState(false);
  const [attempts, setAttempts] = useState([{
    id: 0,
    disabled: false,
    value: '',
    inputs: [
      {
        id: 0,
        value: '',
      },
      {
        id: 1,
        value: '',
      },
      {
        id: 2,
        value: '',
      },
      {
        id: 3,
        value: '',
      },
      {
        id: 4,
        value: '',
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
      },
      {
        id: 1,
        value: '',
      },
      {
        id: 2,
        value: '',
      },
      {
        id: 3,
        value: '',
      },
      {
        id: 4,
        value: '',
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
      },
      {
        id: 1,
        value: '',
      },
      {
        id: 2,
        value: '',
      },
      {
        id: 3,
        value: '',
      },
      {
        id: 4,
        value: '',
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
      },
      {
        id: 1,
        value: '',
      },
      {
        id: 2,
        value: '',
      },
      {
        id: 3,
        value: '',
      },
      {
        id: 4,
        value: '',
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
      },
      {
        id: 1,
        value: '',
      },
      {
        id: 2,
        value: '',
      },
      {
        id: 3,
        value: '',
      },
      {
        id: 4,
        value: '',
      },
    ]
  },
  {
    id: 5,
    value: '',
    disabled: true,
    inputs: [
      {
        id: 0,
        value: '',
      },
      {
        id: 1,
        value: '',
      },
      {
        id: 2,
        value: '',
      },
      {
        id: 3,
        value: '',
      },
      {
        id: 4,
        value: '',
      },
    ]
  },
]);

  const handleChange = (id: number, attemptId: number, e: ChangeEvent<HTMLInputElement>) => {
    const newAttempts = [...attempts];
    const attemptToUpdate = attempts.find(attempt => attempt.id === attemptId);
    const inputToUpdate = attemptToUpdate.inputs.find(input => input.id === id);

    const newInput = {
      ...inputToUpdate,
      value: e.target.value,
    }
    if(!newInput.value) {
      const prevInput = e?.target.previousElementSibling as HTMLInputElement;
      prevInput.focus()
    } else {
      const nextInput = e?.target.nextElementSibling as HTMLInputElement;
      nextInput.focus();
    }

    attemptToUpdate.inputs.splice(id, 1, newInput);
    newAttempts.splice(attemptId, 1, attemptToUpdate);

    setAttempts(newAttempts);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: number, attemptId: number) => {
    const newAttempts = [...attempts];
    const attemptToUpdate = attempts.find(attempt => attempt.id === attemptId);
    const inputToUpdate = attemptToUpdate.inputs.find(input => input.id === id);

    const {key} = e

    if(key === "Enter") {
      const canBeSubmited = attemptToUpdate.inputs.every(input => input.value)
      if(canBeSubmited) {
        const wordArr = [];
        attemptToUpdate.inputs.forEach(input => wordArr.push(input.value));
        const [word] = wordArr;
        attemptToUpdate.value = word;
        attemptToUpdate.disabled = true;

        const nextAttempt = newAttempts.find(attempt => attempt.id === attemptId + 1);
        const nextAttemptIndex = newAttempts.findIndex(attempt => attempt.id === attemptId + 1);
        nextAttempt.disabled = false;
        
        newAttempts.splice(attemptId, 1, attemptToUpdate);
        newAttempts.splice(nextAttemptIndex, 1, nextAttempt);

        setAttempts(newAttempts);

        const next = e.currentTarget.nextElementSibling as HTMLInputElement;
        console.log(next)
        return next.focus()
      } 
    }

    if((!key.match(/^[a-zA-Z]$/) && (key !== "Backspace" && key !== "ArrowLeft" && key !== "ArrowRight"))) return e.preventDefault()
  
    const newInput = {
      ...inputToUpdate,
      value: key,
    }
    
    const prevInput = e?.currentTarget.previousElementSibling as HTMLInputElement;
    const nextInput = e?.currentTarget.nextElementSibling as HTMLInputElement;

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

  return (
    <div>
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
              <p>Olá. Seja bem vindo(a) ao Mythy:<br/> Um jogo web para quem gosta das ciências humanas. <br/> Tente adivinhar o deus(a) do dia de hoje.<br/><br/> Mitologias incluídas:<br/> - Egípcia<br/> - Grega<br/> -Hindu<br/> - Japonesa<br/> - Nórdica<br/> - Miscelânicas (monoteístas e outras religiões menores) </p>
            </nav>  
        </aside>
      }

      <section className={styles.guess}>
          <form className={styles.form}>
            {attempts.map(attempt => {
              return attempt.inputs.map((input) => (
                <input disabled={attempt.disabled} maxLength={1} onKeyDown={(e) => handleKeyDown(e, input.id, attempt.id)} key={input.id} value={input.value}/> // onChange={(e) => handleChange(input.id, attempt.id, e)}
              ))
            })}
          </form>
      </section>
    </div>
  )
}