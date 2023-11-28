import styles from '../../../styles/Dashboard.module.css'

export default async function ListUsers({user}) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return (
        <div>

            {user?.map((users, index) =>
                <p className={styles.names} key={index}>
                    {users.usuario}
                </p>
            )}

        </div>
    )
}
