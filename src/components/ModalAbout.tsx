
import styles from '../../styles/ModalAbout.module.css'

export function ModalAbout({onClose}) {
  return (
    <div className={styles.modal_background}>
      <section className={styles.modal_about}>
        <h2>Sobre o Mythy</h2>
        <p>Mythy é um pequeno jogo web, inspirado por <a href="https://term.ooo">Termo</a>, <a href="https://www.nytimes.com/games/wordle">Wordle</a> e <a href="https://start-gamer.vercel.app">Start</a>.</p>
      </section>
    </div>
  )
}