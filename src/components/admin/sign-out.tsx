import { signOut } from "../../../auth"
import styles from './shared.module.css';

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button className={styles.signOut} type="submit">Sign Out</button>
    </form>
  )
}