import React from 'react';
import { Auth, Cache, Hub } from 'aws-amplify';
// import PropTypes from 'prop-types';

function AuthSuccess({ location }) {
  // eslint-disable-next-line
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    console.log({ Auth });
    getToken();
  }, []);

  function checkSession() {
    Auth.currentSession()
      .then((session) => {
        const token = session.idToken.jwtToken;
        console.log('setting token', { session });
        // This is the line that allows the GraphQL endpoint to use the
        // jwt.
        Cache.setItem('federatedInfo', { token });
      })
      .catch((err) => console.log(err));
  }

  function getToken() {
    Auth.currentSession()
      .then((session) => console.log({ session }) || session)
      .catch((err) => console.log(err));
  }

  // const Auth.federatedSignin()
  React.useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          setToken('grating...');
          getToken().then((userToken) => setToken(userToken.idToken.jwtToken));
          break;
        case 'signOut':
          setToken(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <div className="AuthSuccess">
      <span>Auth Success</span>
      <button onClick={checkSession}>check session</button>
    </div>
  );
}

AuthSuccess.propTypes = {};

AuthSuccess.defaultProps = {};

export default AuthSuccess;
