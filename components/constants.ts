const CORS_PROXY = "https://api.codetabs.com/v1/proxy?quest=";

const env = process.env.NODE_ENV;

export const CURRENCIES_URL = `${
  env === "development" && CORS_PROXY
}https://api.coingate.com/v2/currencies`;

export const RATES_URL = `${
  env === "development" && CORS_PROXY
}https://api.coingate.com/v2/rates`;
