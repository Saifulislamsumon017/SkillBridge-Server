import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const env = {
  PORT: process.env.PORT || '5000',
  DATABASE_URL: process.env.DATABASE_URL!,

  APP_URL: process.env.APP_URL!,

  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL!,

  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: Number(process.env.SMTP_PORT!),

  APP_USER: process.env.SMTP_USER!,
  APP_PASS: process.env.SMTP_PASS!,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,

  // GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID!,
  // GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
};
