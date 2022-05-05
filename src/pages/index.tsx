import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, ChangeEvent } from 'react';

export default function Home() {
  const [showAside, setShowAside] = useState(false);
  const [attempts, setAttempts] = useState([
    {
      id: 0,
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
  ]);

  const handleChange = (id: number, attemptId: number, e: ChangeEvent<HTMLInputElement>) => {
    const newAttempts = [...attempts];
    const attemptToUpdate = attempts.find(attempt => attempt.id === attemptId);
    const inputToUpdate = attemptToUpdate.inputs.find(input => input.id === id);

    const newInput = {
      ...inputToUpdate,
      value: e.target.value,
    }

    const nextInput = e?.target.nextElementSibling as HTMLInputElement;
    nextInput.focus();

    attemptToUpdate.inputs.splice(id, 1, newInput);
    newAttempts.splice(attemptId, 1, attemptToUpdate);

    setAttempts(newAttempts);
  }

  return (
    <div>
      <header>
          <ul className={styles.ul}>
              <div className={styles.logo_ajuda}>
                  <li onClick={() => setShowAside(!showAside)}><img id="logo" src="/logo.svg" /></li>
                  <li><img src="/ajuda.svg" /></li>
              </div>
              <p>Mythy</p>
              <div className={styles.stats_config}>
                  <li><img src="stats.svg" /></li>
                  <li><img src="config.svg" /></li>
              </div>
          </ul>
      </header>

      {showAside && 
        <aside className={styles.icon_nav}>
            <nav>
              <p>Os criadores de Mythy:</p>
              <p>Guilherme Schneider</p>
              <p>Programador front-end, desenvolvedor do projeto indie Maple To-Do.</p>
              <p>GitHub</p>
              <p>Vinicíus Hack</p>
              <p>Programador front-end, desenvolvedor no projeto Goalfy.</p>
              <p>GitHub</p>
            </nav>
        </aside>
      }

      <section className={styles.guess}>
          <form className={styles.form}>
            {attempts.map(attempt => {
              return attempt.inputs.map(input => (
                <input key={input.id} value={input.value} onChange={(e) => handleChange(input.id, attempt.id, e)}/>
             ))
            })}
          </form>
      </section>
    </div>
  )
}
