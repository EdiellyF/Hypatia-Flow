import nodemailer from 'nodemailer';

export class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host:  process.env.EMAIL_HOST, 
            port: 2525,            
            secure: false,       
            auth: {
                user: process.env.EMAIL_USER,     
                pass: process.env.EMAIL_PASS 
            },
            connectionTimeout: 30000,    
            greetingTimeout: 30000,
            socketTimeout: 30000,
            tls: {
                rejectUnauthorized: false,
                ciphers: 'SSLv3'
            }
        });
    }

    async sendEmail(to, subject, text) {
        try {
            if (!to || !subject || !text) {
                throw new Error('Todos os campos são obrigatórios: to, subject, text');
            }

            await this.verifyConnection();

            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: to,
                subject: subject,
                text: text,
                headers: {
                    'X-Entity-Ref-ID': Date.now(),
                    'X-Priority': '3'
                }
            };

        
            const result = this.transporter.sendMail(mailOptions);

            console.log('Email enviado com sucesso');
            
            return result;
        } catch (error) {
            console.error('Falha ao enviar email');
            throw error;
        }
    }

    async verifyConnection() {
        try {
            await this.transporter.verify();
            return true;
        } catch (error) {
            console.error('✗ Erro na conexão com SMTP:', {
                message: error.message
            });
            throw error;
        }
    }
}