type LoginState = 'AUTHENTICATED' | 'EXPIRED' | 'UNAUTHENTICATED';

const getLoginState = (
  rememberMe: boolean | null,
  accessToken: string | null,
  validUntil: string | null
): LoginState => {
  if (
    rememberMe &&
    accessToken &&
    validUntil &&
    new Date() < new Date(validUntil)
  ) {
    return 'AUTHENTICATED';
  } else if (
    rememberMe &&
    !accessToken &&
    validUntil &&
    new Date() < new Date(validUntil)
  ) {
    return 'EXPIRED';
  }

  return 'UNAUTHENTICATED';
};

export default getLoginState;
