export const config = {
  HOST: process.env.HOST ?? '',
  PORT: process.env.PORT ?? '3000',

  MYRIAD_WEB_URL: process.env.REACT_APP_MYRIAD_WEB_URL ?? '',
  MYRIAD_API_URL: process.env.REACT_APP_MYRIAD_API_URL ?? '',
  MYRIAD_API_KEY: process.env.REACT_APP_MYRIAD_API_KEY ?? '',

  MYRIAD_ADMIN_EMAIL: process.env.REACT_APP_MYRIAD_ADMIN_EMAIL ?? '',
  MYRIAD_ADMIN_PASSWORD: process.env.REACT_APP_MYRIAD_ADMIN_PASSWORD ?? '',
};
