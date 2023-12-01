'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from "react";
import styles from '../../../../styles/Register.module.css'
import { postUser } from "@/app/functions/handlerAcessAPI";

export default function Register(){

const [regist, setRegist] = useState({
  usuario: '',
  senha: '',
  confirmar: '',
});
const { push } = useRouter();

const handlerRegister = async (e) => {
  e.preventDefault();
  try {
    await postUser(regist);
    toast.success("Cadastro efetuado com sucesso!");
    push('/pages/dashboard');
} catch (err) {
  toast.error("Erro no nome ou senha!");
  console.log(err);
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
          onChange={(e) => { setRegist({ ...regist, usuario: e.target.value }) }}
          required>
        </input>
        <input className={styles.input3}
          placeholder='Senha'
          name="senha"
          type='password'
          onChange={(e) => { setRegist({ ...regist, senha: e.target.value }) }}
          required>
        </input>
        <input className={styles.input3}
          placeholder='Confirmar senha'
          name="confirmar"
          type='password'
          onChange={(e) => { setRegist({ ...regist, confirmar: e.target.value }) }}
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