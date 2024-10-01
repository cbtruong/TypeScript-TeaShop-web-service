import { IMailOption } from "../interface"


const mailOption = ({ to, subject, text }: { to: string, subject: string, text: string }): IMailOption => {
  return {
    from: 'TEA SHOP',
    to: to,
    subject: subject,
    text: text,
  }
}

export default mailOption
