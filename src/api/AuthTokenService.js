const AUTH_TOKEN = 'AUTH_TOKEN';

function getToken() {
  return localStorage.getItem(AUTH_TOKEN);
}

function setToken(token) {
  localStorage.setItem(AUTH_TOKEN, token);
}

function removeToken() {
  localStorage.removeItem(AUTH_TOKEN);
}

export { getToken, setToken, removeToken };
