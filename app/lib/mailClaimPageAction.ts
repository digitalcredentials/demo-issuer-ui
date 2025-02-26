'use server';

import { z } from 'zod';
import { getLCWExperienceEmail } from './email-templates/lcw-experience';
import nodemailer from 'nodemailer'

const host = process.env.SMTP_HOST
const user = process.env.SMTP_USER
const pass = process.env.SMTP_PASS
const port = process.env.SMTP_PORT
const appHost = process.env.APP_HOST

const smtpOptions : any = {
    host,
    auth: { user, pass },
    ...(port && {port})
} 

const transporter = nodemailer.createTransport(smtpOptions)

const FormSchema = z.object({
  recipientName: z.string().trim()
    .min(1, { message: "You must enter a name." }),
  email: z.string().email()
});

export type State = {
  errors?: {
    recipientName?: string[];
    email?: string[];
  };
  message?: string | null;
  success?: boolean;
  data?: {
    recipientName?: string;
    email?: string;
  };
};


export async function sendEmail(prevState: State, formData: FormData) : Promise<State> {

  const recipientName = formData.get('recipientName')
  const email = formData.get('email')
  const data = {recipientName, email}
  const validatedFields = FormSchema.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields - complete them so we can get you your credential!"
    };
  }

  try {
    // send email
    const collectionPageURL = `${appHost}/collect?recipientName=${validatedFields.data.recipientName}`
    const emailContent = getLCWExperienceEmail(collectionPageURL, validatedFields.data.recipientName)
    await sendMail(emailContent, validatedFields.data.email)
    
  } catch (error) {
    console.log(error)
    return {
      message: 'Error: Failed to issue.',
      success: false,
      ...data
    };
  }
  return {...data, success: true};
}

async function sendMail(message:string, recipient:string) {
    const messageParams = {
        from: process.env.EMAIL_FROM,
        to: recipient,
        subject: "You've got a credential!",
        html: message
      }
    await transporter.sendMail(messageParams)
}



