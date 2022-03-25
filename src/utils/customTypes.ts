type webhookType = {
  name: string;
  token: string;
  tokenName: string;
  url: string;
  id: string;
  tokenType: string;
};

export type formObjectType = {
  data: {
    webhooks: webhookType[];
  }[];
};
