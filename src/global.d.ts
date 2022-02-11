// declare module '@yaireo/tagify';
// declare module '@yaireo/tagify/dist/react.tagify';

export {};

declare global {
  interface Window {
    process_env: {
      REACT_APP_MYRIAD_WEBSITE_URL: string;
      REACT_APP_MYRIAD_SUPPORT_MAIL: string;
      REACT_APP_MYRIAD_WEB_URL: string;
      REACT_APP_MYRIAD_API_URL: string;
      REACT_APP_MYRIAD_API_KEY: string;
      REACT_APP_MYRIAD_ADMIN_EMAIL: string;
      REACT_APP_MYRIAD_ADMIN_PASSWORD: string;
    };
  }
}
