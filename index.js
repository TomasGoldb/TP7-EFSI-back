import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Configuración de SMTP de Brevo
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 465,
    secure: true, // true para puerto 465
    auth: {
        user: process.env.BREVO_USER, // tu correo verificado en Brevo
        pass: process.env.BREVO_PASS  // la clave SMTP
    }
});

app.post('/mandar-mail', async (req, res) => {
    const { to, subject, message } = req.body;

    try {
        await transporter.sendMail({
            from: `"TuiTui" <${process.env.BREVO_USER}>`,
            to,
            subject,
            text: message
        });
        res.send('Email enviado con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el correo');
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});
