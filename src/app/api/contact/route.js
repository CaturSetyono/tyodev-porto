import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Semua field harus diisi.' }, { status: 400 });
  }

  try {
    // Konfigurasi transporter SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Kirim email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `Pesan Kontak dari ${name}`,
      html: `<p><strong>Nama:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Pesan:</strong><br/>${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengirim pesan.' }, { status: 500 });
  }
}
