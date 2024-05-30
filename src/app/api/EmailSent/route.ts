import { Resend } from 'resend';
import VerificationEmail from '../../../components/CustomComponents/VerificationEmail';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { username, email, otp } = await request.json();
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Anonymous App',
      react: VerificationEmail({ username: username, otp: otp }),
    });

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (emailError) {
    // console.log("Error in sending Email", emailError);
    return NextResponse.json({ success: false, message: "Error in sending Email" });
  }
}
