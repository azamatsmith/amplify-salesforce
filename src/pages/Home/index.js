import React from 'react';
import { Auth } from 'aws-amplify';

function Home() {
  const COGNITO_PROVIDER_NAME = 'Salesforce2';
  return (
    <div className="Home">
      <span>Home</span>
      <button
        onClick={() =>
          Auth.federatedSignIn({ provider: COGNITO_PROVIDER_NAME })
        }
      >
        Go to federated sign in
      </button>
    </div>
  );
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
