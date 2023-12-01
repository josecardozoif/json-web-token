import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";
import styles from '../../../../styles/Dashboard.module.css'
import Link from 'next/link';

export default async function Dashboard() {
    const callUser = await getUsers();

    return (
        <body className={styles.body}>
        <div className={styles.div}>
            <Suspense className={styles.suspense} fallback={<p className={styles.loading}>Carregando...</p>}>
                <h1 className={styles.h1}>Usuários Cadastrados</h1>
                
                <div>
                {callUser.map((users) =>
                <p className={styles.usuario}> {users.usuario}</p>
                )}
                </div>

                <div className={styles.routes}>
                    <Link className={styles.link} href='/pages/alter'>Alterar</Link> | 
                    <Link className={styles.link} href='/pages/register'> Cadastre-se</Link>
                </div>
            </Suspense>
        </div>
        </body>
    )
}