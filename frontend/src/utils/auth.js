export const saveToken = (token) => {
  localStorage.setItem('auth-token', token);
};

export const getToken = () => {
  return localStorage.getItem('auth-token');
};

export const logout = () => {
  localStorage.removeItem('auth-token');
};
