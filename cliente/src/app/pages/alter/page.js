'use client'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from "react";
import styles from '../../../../styles/Alter.module.css'


export default function Alter(){

const handlerAlt = async (e) => {
    e.preventDefault();
      toast.success("Alteração efetuada com sucesso!");
}
return (
  <body className={styles.body}>
    <div className={styles.div}>
    <Suspense className={styles.suspense} fallback={<p className={styles.loading}>Carregando...</p>}>
      <h1 className={styles.h1}>Altere seus Dados</h1>
      <form onSubmit={handlerAlt}>
        <input className={styles.input1}
          placeholder='Nome'
          type="text"
          required>
        </input>
        <input className={styles.input2}
          placeholder='E-mail'
          type="email"
          required>
        </input>
        <input className={styles.input3}
          placeholder='Senha'
          type='password'
          required>
        </input>
        <button className={styles.button}>Alterar</button>
        <ToastContainer/>
      </form>
      </Suspense>
    </div>
  </body>
)
}