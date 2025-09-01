export const saveToken = (t: string) => localStorage.setItem("JWT", t);
export const loadToken = () => localStorage.getItem("JWT");
export const clearToken = () => localStorage.removeItem("JWT");