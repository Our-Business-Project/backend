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

  async sendVerificationMail(tokenPayload) {
    if (!tokenPayload) {
      throw new CustomError("Not Authorized", 401);
    }

    const user = await usersService.getUserById(tokenPayload, tokenPayload._id);

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

  async verifyEmail(tokenPayload, tPayload) {
    if (!tPayload) {
      throw new CustomError("Invalid verification token", 400);
    }

    if (!tokenPayload || tPayload._id !== tokenPayload._id) {
      throw new CustomError("Not Authorized", 401);
    }

    const user = await usersService.getUserById(tokenPayload, tPayload._id);

    if (user.isEmailVerified) {
      throw new CustomError("Email already verified", 400);
    }

    await usersService.patchUser(tokenPayload, { isEmailVerified: true });

    return { message: "Email successfully verified!" };
  }
}

const mailService = new MailService(resend);
export { mailService };
