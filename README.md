# pincoin ts/react frontend

- React-Router
- Redux: store
  - reducers
  - extraReducers: async thunk
  - RTK query API
- Authentication
  - Sign-in API request using RTK query - Access token issue
  - Saved access token in Redux state, refresh token in httpOnly/secure cookie (saved refresh token in Redis)
  - Logged-in check if Redux access token is not null
  - If access token is null or invalid, get refresh token, and call api request
  - IP address when authenticated = IP address when refreshed
  - Refresh page -> Renew access token -> Set timeout 1 hour to auto-logout
  - Role-based protected router: 401 (invalid access token) / 403 (invalid role)

  - Trusted devices & Login from multiple places
  - Login attempt n-times failure: CAPTCHA
  - Login success logging

- Workflow
  - User Registration
    - Duplicated email check
    - Duplicated username check
    - Terms / Privacy agreement check
  - My Page
    - Email verification
    - Phone verification
    - Document verification