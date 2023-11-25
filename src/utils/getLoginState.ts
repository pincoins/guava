type LoginState = 'AUTHENTICATED' | 'STALE' | 'EXPIRED';

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
    return 'STALE';
  }

  return 'EXPIRED';
};

export default getLoginState;
