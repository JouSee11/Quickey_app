import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import path from 'path';

interface EmailOptions {
    to: string,
    from: string,
    subject: string,
    template?: string,
    data?: Record<string, any>,
    html?: String
}

class EmailService {
    private transporter: Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        })
    }

    private generateEmailHtml(template: string, data: Record<string, any>): string {
        
    }



}