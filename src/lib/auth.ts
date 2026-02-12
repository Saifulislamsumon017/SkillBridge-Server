import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { UserRole } from '../constants/role';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: {
    user: env.APP_USER,
    pass: env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  trustedOrigins: [env.APP_URL],

  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: UserRole.USER,
      },
      phone: {
        type: 'string',
        required: false,
      },
      status: {
        type: 'string',
        defaultValue: 'ACTIVE',
        required: false,
      },
      tutorStatus: {
        type: 'string',
        required: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}`;

      await transporter.sendMail({
        from: '"SkillBridge" <noreply@skillbridge.com>',
        to: user.email,
        subject: 'Verify your SkillBridge account',
        html: `<h2>Hello ${user.name}</h2>
               <p>Click below to verify your email:</p>
               <a href="${verificationUrl}">Verify Email</a>`,
      });
    },
  },

  socialProviders: {
    google: {
      prompt: 'select_account consent',
      accessType: 'offline',
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
});
