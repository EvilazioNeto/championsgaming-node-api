import transporter from '../../config/emailConfig';

interface MailOptions {
    from: string;
    to: string | string[];
    subject: string;
    text: string;
    html: string;
}

export async function sendEmail(from: string, to: string | string[], subject: string, text: string, html: string): Promise<void> {
    const senderEmail = process.env.EMAIL_USER || '';
    const mailOptions: MailOptions = {
        from: `"${from}" <${senderEmail}>`,
        to: to,
        subject: subject,
        text: text,
        html: html,
    };

    if (!senderEmail || !to || !subject || (!text && !html)) {
        console.error('Erro: Campos obrigatórios faltando para envio de e-mail.');
        return;
    }

    try {
        const mailSent = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado:', mailSent);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
}
