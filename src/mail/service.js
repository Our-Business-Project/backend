import { Resend } from "resend";
import nunjucks from "nunjucks";
import { generateToken, verifyToken } from "../helpers/auth.helper.js";
import { usersService } from "../services/users.service.js";
import CustomError from "../models/error.custom.js";

import dotenv from "dotenv";
dotenv.config({ path: "./prod.env" });

const resend = new Resend(process.env.RESEND_TOKEN);

class MailService {
  constructor(resend) {
    this.resend = resend;
  }

  async sendVerificationMail(token) {
    const tokenPayload = verifyToken(token);

    const user = await usersService.getUserById(token, tokenPayload._id);

    if (user.isEmailVerified) {
      throw new CustomError("Email already verified", 400);
    }

    await this.resend.emails.send({
      from: "onboarding@resend.dev",
      to: user.email,
      subject: "YBA: Email verification",
      html: nunjucks.render("src/mail/template.html", {
        userName: user.lastName + " " + user.firstName,
        siteUrl: process.env.FRONTEND_URL,
        verificationUrl:
          process.env.FRONTEND_URL +
          "/" +
          generateToken(tokenPayload._id, "15m"),
      }),
    });
    return { message: "Message sent!" };
  }

  async verifyEmail(token, mailToken) {
    const tokenPayload = verifyToken(token);
    const tPayload = verifyToken(
      mailToken,
      new CustomError("Invalid verification token", 400)
    );

    if (tPayload._id !== tokenPayload._id) {
      throw new CustomError("Invalid account", 401);
    }

    const user = await usersService.getUserById(token, tPayload._id);

    if (user.isEmailVerified) {
      throw new CustomError("Email already verified", 400);
    }

    await usersService.patchUser(token, { isEmailVerified: true });

    return { message: "Email successfully verified!" };
  }
}

const mailService = new MailService(resend);
export { mailService };
