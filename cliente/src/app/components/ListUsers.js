import styles from '../../../styles/Dashboard.module.css'

export default async function ListUsers({users}) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return (
        <div>

            {users?.map((user, index) =>
                <p className={styles.names} key={index}>
                    {user.name}
                </p>
            )}

        </div>
    )
}
