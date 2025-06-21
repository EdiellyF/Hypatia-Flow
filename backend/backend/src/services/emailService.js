import nodemailer from 'nodemailer';

export class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendEmail(to, subject, text) {
        this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        })
    }
}