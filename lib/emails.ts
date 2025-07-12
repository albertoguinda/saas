import { Resend } from "resend";

import dbConnect from "@/lib/dbConnect";
import EmailLog from "@/lib/models/emailLog";
import { logger } from "@/lib/logger";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function sendEmail({
  userId,
  to,
  subject,
  html,
  type,
}: {
  userId?: string;
  to: string;
  subject: string;
  html: string;
  type: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    logger.warn("[email] RESEND_API_KEY missing");

    return;
  }

  let success = false;
  let error = "";

  try {
    await resend.emails.send({
      from: "noreply@saas.com",
      to,
      subject,
      html,
    });
    success = true;
  } catch (err) {
    logger.error(err);
    error = (err as Error).message;
  }

  try {
    await dbConnect();
    await EmailLog.create({ userId, to, subject, type, success, error });
  } catch (err) {
    logger.error(err);
  }
}

export async function sendWelcomeEmail(
  userId: string,
  email: string,
  name: string,
  token: string,
) {
  const link = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/confirm/${token}`;
  const html = `<p>Hi ${name},</p><p>Please confirm your account:</p><p><a href="${link}">${link}</a></p>`;

  await sendEmail({
    userId,
    to: email,
    subject: "Confirm your account",
    html,
    type: "welcome",
  });
}

export async function sendPlanEmail(
  userId: string,
  email: string,
  plan: string,
) {
  const html = `<p>Your plan is now <b>${plan}</b>.</p>`;

  await sendEmail({
    userId,
    to: email,
    subject: "Plan updated",
    html,
    type: "plan",
  });
}

export async function sendBackupEmail(userId: string, email: string) {
  const html = `<p>Your backup is ready.</p>`;

  await sendEmail({
    userId,
    to: email,
    subject: "Backup created",
    html,
    type: "backup",
  });
}

export async function sendRestoreEmail(userId: string, email: string) {
  const html = `<p>Your account has been restored.</p>`;

  await sendEmail({
    userId,
    to: email,
    subject: "Restore completed",
    html,
    type: "restore",
  });
}
