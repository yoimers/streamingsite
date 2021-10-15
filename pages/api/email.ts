import sgMail from "@sendgrid/mail";
import { WebClient } from "@slack/web-api";

const web = new WebClient(process.env.NEXT_PUBLIC_SLACK_TOKEN);
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

const handler = (req: any, res: any) => {
  const { from, subject, text, name } = req.body;
  const msg: sgMail.MailDataRequired = {
    from: {
      name: "Wavelet お問い合わせ",
      email: "waveletsignal@gmail.com",
    },
    personalizations: [
      {
        to: from,
        dynamicTemplateData: { Sender_Name: name },
      },
    ],
    templateId: "d-49c239969ff64746afc5a1611dd42e56",
  };
  sgMail.send(msg).catch((e) => console.log(e));
  slacksend({ name, subject, from, text });
  res.end();
};

type InType = {
  name: string;
  subject: string;
  from: string;
  text: string;
};
const slacksend = async ({ name, subject, from, text }: InType) => {
  try {
    const result = await web.chat.postMessage({
      token: process.env.NEXT_PUBLIC_SLACK_TOKEN,
      channel: "C02HUUG50TX",
      text: `*${name}* : *${from}*\n *${subject}* \n ${text}`,
    });
  } catch (e) {
    console.error(e);
  }
};

export default handler;
