import styles from '../../../styles/Dashboard.module.css'

export default async function ListUsers({register}) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return (
        <div>

            {register.map(dbUser =>
                <p className={styles.names} key={dbUser.usuario}>
                    {dbUser.usuario}
                </p>
            )}

        </div>
    )
}
