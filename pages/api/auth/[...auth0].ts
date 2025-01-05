import { handleAuth } from "@auth0/nextjs-auth0";

export default handleAuth({
  session: {
    rolling: true,
    rollingDuration: 60 * 60 * 8,
    cookieSecret: process.env.AUTH0_COOKIE_SECRET,
  },
} as any);
