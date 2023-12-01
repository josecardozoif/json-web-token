'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from "react";
import styles from '../../../../styles/Register.module.css'
import { postUser } from "@/app/functions/handlerAcessAPI";

export default function Register(){

const [user, setUser] = useState({
  usuario: '',
  senha: '',
  confirmar: '',
});
const { push, refresh } = useRouter();

const handlerRegister = async (e) => {
  e.preventDefault();
  try {
    await postUser(user);
    return push('/pages/dashboard');
} catch {
    toast.error("Erro no nome ou senha!");
    refresh();
  }
};

return (
  <body className={styles.body}>
    <div className={styles.div}>
    <Suspense className={styles.suspense} fallback={<p className={styles.loading}>Carregando...</p>}>
      <h1 className={styles.h1}>Cadastre-se</h1>
      <form onSubmit={handlerRegister}>
        <input className={styles.input1}
          placeholder='Nome'
          name="nome"
          type="text"
          onChange={(e) => { setUser({ ...user, usuario: e.target.value }) }}
          required>
        </input>
        <input className={styles.input3}
          placeholder='Senha'
          name="senha"
          type='password'
          onChange={(e) => { setUser({ ...user, senha: e.target.value }) }}
          required>
        </input>
        <input className={styles.input3}
          placeholder='Confirmar senha'
          name="confirmar"
          type='password'
          onChange={(e) => { setUser({ ...user, confirmar: e.target.value }) }}
          required>
        </input>
        <button className={styles.button}>Cadastrar</button>
      </form>
      <ToastContainer/>
      </Suspense>
    </div>
  </body>
)
}