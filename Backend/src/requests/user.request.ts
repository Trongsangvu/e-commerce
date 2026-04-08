import z from "zod";

export const userLoginRequest = z.object({
  body: z.object({
    email: z.email().nonempty(),
    password: z.string().trim().nonempty(),
  }),
});

export const userRegisterRequest = z.object({
  body: z.object({
    name: z.string().trim().nonempty(),
    email: z.email().nonempty(),
    password: z.string().trim().nonempty(),
  }),
});

export const userCreateRequest = z.object({
  body: z.object({
    name: z.string().trim().nonempty(),
    email: z.email().nonempty(),
    password: z.string().trim().nonempty(),
  }),
});

export const oauthLoginRequest = z.object({
  body: z.object({
    name: z.string().trim().nonempty(),
    email: z.email().nonempty(),
    $id: z.string().trim().min(1),
  }),
});

export type UserLoginRequest = z.infer<typeof userLoginRequest>;
export type UserRegisterRequest = z.infer<typeof userRegisterRequest>;
export type UserCreateRequest = z.infer<typeof userCreateRequest>;
export type OauthLoginRequest = z.infer<typeof oauthLoginRequest>;
