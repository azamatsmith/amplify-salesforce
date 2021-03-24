import { Auth } from 'aws-amplify';

export const configureAuth = () => {
  const oauth = {
    domain: process.env.REACT_APP_COGNITO_DOMAIN,
    scope: ['openid', 'profile'],
    redirectSignIn: process.env.REACT_APP_REDIRECT_URI,
    redirectSignOut: process.env.RACT_APP_REDIRECT_URI,
    // responseType: 'code',
    responseType: 'token',
  };
  Auth.configure({
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,
    oauth,
  });
};
