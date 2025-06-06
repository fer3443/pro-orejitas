import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
// const privateKey = process.env.EMAILJS_PRIVATE_KEY as string;

interface EmailProps {
  to: string;
  name: string;
  resetUrl: string;
}

export const sendPassResetEmail = async ({
  to,
  name,
  resetUrl,
}: EmailProps) => {
  const templateParams = {
    to_name: name,
    to_email: to,
    reset_link: resetUrl,
  };



try {
  await emailjs.send(
    `${serviceId}`,
    `${templateId}`,
    templateParams,
    {
      publicKey: `${publicKey}`,
    },
  );
  console.log('SUCCESS!');
  return {
      success: true,
      message: "Email enviado",
    };
} catch (err) {
  if (err instanceof EmailJSResponseStatus) {
    console.log('EMAILJS FAILED...', err);
    return {
      success: false,
      message: "No se pudo enviar el email, intente más tarde"
    };
  }

  console.log('ERROR', err);
  return {
    success:false,
    message:"Error inesperado"
  }
}
};
