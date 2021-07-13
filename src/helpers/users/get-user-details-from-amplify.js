import get from 'lodash/get';

const getUserDetailsFromAmplify = (amplifyUser) => {
    const {
        sub: id,
        given_name: firstName,
        email,
        email_verified: isVerified,
        family_name: lastName
      } = get(amplifyUser, 'attributes', {});

    const {accessToken, idToken} = get(amplifyUser, 'signInUserSession', {});

      return {
        id,
        firstName,
        lastName,
        email,
        isVerified,
        accessToken: accessToken.jwtToken,
        idToken: idToken.jwtToken,
      };
}

export default getUserDetailsFromAmplify;