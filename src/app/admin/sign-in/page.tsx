import { AdminHeaderSignedOut } from "@/components/admin/admin-header"
import SignInButton from "../../../components/admin/sign-in"
import styles from './sign-in.module.css';

export default function Home() {
    return (
        <div className={styles.background}>
            <AdminHeaderSignedOut>
                <div className={styles.container}>
                    <h1>Sign in</h1>
                    <div className={styles.wrapper}>
                        <SignInButton/>
                    </div>
                </div>
            </AdminHeaderSignedOut>
        </div>
    )
}