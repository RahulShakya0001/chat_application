const HOST = import.meta.env.VITE_SERVER_URL;
const AUTH_ROUTES = "/api/auth";
const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;

export { HOST, SIGNUP_ROUTE, LOGIN_ROUTE };
