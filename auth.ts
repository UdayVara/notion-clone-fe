import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axiosInstance from "./axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: "sdjfklsdjfkj",
  providers: [
    CredentialProvider({
      async authorize(credentials, request) {
        // TODO API CALL HERE
        try {
          const res = await axiosInstance.post("/user/signin", credentials);
          console.log("Crendetil Response", res.data);
          if (res.data.statusCode == 201) {
            
            return {
              ...res.data.user,
            };
          } else {
            throw new Error(res.data.message);
          }
        } catch (error) {
          console.log("inside catch",error);
          throw new Error("Internal Server Error");
        }
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      if (params.user) {
        params.token = params.user;
      }
      return params.token;
    },
    session(params: any) {
      if (params.token) {
        params.session.user = params.token;
      }
      return params.session;
    },
  },
  pages: {
    signIn: "/",
  },
});
