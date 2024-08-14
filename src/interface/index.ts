interface IGoogleResponse {
  sub: string;
  given_name: string;
  family_name: string;
  picture: string
}

interface IMailOption {
  from: string;
  to: string;
  subject: string;
  text: any;
}

export {
  IGoogleResponse, IMailOption
}
