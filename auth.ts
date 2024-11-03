import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const authorizedEmail = process.env.AUTHORIZED_EMAIL;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ profile }) {
      // check the user's email is the appropriate admin
      if (profile?.email && authorizedEmail == profile.email) {
        return true;
      } else {
        return false;
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // sessions expire after 30 minutes
  },
  pages: {
    signIn: '/admin/sign-in',
  },
  trustHost: true
})