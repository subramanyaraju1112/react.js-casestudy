import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useLogoutMutation } =
  authApi;
