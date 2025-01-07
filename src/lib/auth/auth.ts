/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import Credentials from "next-auth/providers/credentials";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "next-auth";
import UserService from "@/services/UserService";


const sevenDays = 7 * 24 * 60 * 60;
const oneDay = 24 * 60 * 60;
const maxAge = process.env.NODE_ENV === "production" ? oneDay : sevenDays;

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        value: { label: "Valor", type: "string" },
        codeValidationType: { label: "Code Validation Type", type: "string" },
      },
      async authorize(credentials, _req) {
        try {
          const { tokenBearer, userID, userType, email } =
            await UserService.ValidationCode(
              credentials!.value,
              credentials!.codeValidationType
            );
          return {
            id: userID,
            token: tokenBearer,
            userType: userType,
            email: email,
          };
        } catch (error) {
          if (isAxiosError(error)) {
            const errorToThrow =
              error.response?.data?.map((error: string) => error).join("\n") ??
              "Erro Interno do Servidor";
            throw new Error(errorToThrow);
          }
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: oneDay,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    error: "/",
    signOut: "/",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);

export const GetSession = (): any => {
  if (typeof window === "undefined") return getServerAuthSession();
  return getSession();
};

export const createRequestAuthObj = async () => {
  const session = await GetSession();
  if (!session) return {};
  return {
    headers: {
      Authorization: `Bearer ${session.user.token ?? session.user?.token}`,
    },
  };
};