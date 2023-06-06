import sgMail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";
sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

const fromEmail: string = process.env.SENDGRID_EMAIL ?? '';

export const POST =  async (req: NextRequest) => {

    const body = await req.json();
    const { itemName, email } = body;
    console.log('ItemName: ', itemName, 'Email: ', email);

    const msg = {
        to: email,
        from: fromEmail,
        subject: `${itemName} has run out`,
        text: `${itemName} has run out`,
        html: `<strong>The item ${itemName} has run out</strong>`,
    };

    try {
        await sgMail.send(msg);
        return NextResponse.json({ message: 'Email sent'});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error sending email'});
        }
}
