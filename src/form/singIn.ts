import { zodResolver } from "@hookform/resolvers/zod";
import { SinginInput } from "../schema/singin";
import { z } from "zod";

export const schema = z.object({
  username: z
    .string()
    .email({ message: "請輸入正確郵件地址" })
    .min(1, { message: "請輸入帳號" }),
  password: z.string().min(1, { message: "請輸入密碼" }),
  _remmeberMe: z
    .boolean()
    .refine((val) => val === true, { message: "請勾選條款" }),
});

export type Schema = z.infer<typeof schema>;

export const resolvers = zodResolver(schema);
