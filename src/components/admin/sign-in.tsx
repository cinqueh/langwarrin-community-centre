import { signIn } from "../../../auth"
import styles from './shared.module.css';

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/admin" })
      }}
    >
      <button className={styles.signIn} type="submit">
        <img src="/images/google-g.svg" className={styles.google}/> 
        <span>Sign in with Google</span></button>
    </form>
  )
} 