export const config = {
  HOST: process.env.HOST ?? '',
  PORT: process.env.PORT ?? '3000',

  MYRIAD_WEBSITE_URL: window.process_env.REACT_APP_MYRIAD_WEBSITE_URL ?? process.env.REACT_APP_MYRIAD_WEBSITE_URL ?? '',
  MYRIAD_SUPPORT_MAIL: window.process_env.REACT_APP_MYRIAD_SUPPORT_MAIL ?? process.env.REACT_APP_MYRIAD_SUPPORT_MAIL ?? '',

  MYRIAD_WEB_URL: window.process_env.REACT_APP_MYRIAD_WEB_URL ?? process.env.REACT_APP_MYRIAD_WEB_URL ?? '',
  MYRIAD_API_URL: window.process_env.REACT_APP_MYRIAD_API_URL ?? process.env.REACT_APP_MYRIAD_API_URL ?? '',
  MYRIAD_API_KEY: window.process_env.REACT_APP_MYRIAD_API_KEY ?? process.env.REACT_APP_MYRIAD_API_KEY ?? '',

  MYRIAD_ADMIN_EMAIL: window.process_env.REACT_APP_MYRIAD_ADMIN_EMAIL ?? process.env.REACT_APP_MYRIAD_ADMIN_EMAIL ?? '',
  MYRIAD_ADMIN_PASSWORD: window.process_env.REACT_APP_MYRIAD_ADMIN_PASSWORD ?? process.env.REACT_APP_MYRIAD_ADMIN_PASSWORD ?? '',
};
