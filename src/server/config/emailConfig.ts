import nodemailer, { TransportOptions } from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || '',
    port: parseInt(process.env.EMAIL_PORT || '587', 10), 
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
    },
    tls: {
        rejectUnauthorized: false, 
    },
} as TransportOptions);

export default transporter;
