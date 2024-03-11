import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "이메일" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "비밀번호",
        },
      },

      async authorize(credentials) {
        const res = await fetch("https://onyx-onyx.koyeb.app/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.username,
            password: credentials?.password,
          }),
        });
        /* 로그인이 실패하면 에러처리 */
        if (!res.ok) {
          return null;
        }
        return await res.json();
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      return { ...token, ...user };
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token;
      return session;
    },
  },
};
