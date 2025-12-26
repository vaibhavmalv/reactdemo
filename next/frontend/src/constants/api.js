export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";

export const AUTH = {
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER: `${API_BASE}/auth/register`
    ,
    PASSWORD_RESET_REQUEST: `${API_BASE}/auth/password-reset`,
    PASSWORD_RESET_CONFIRM: (token) => `${API_BASE}/auth/password-reset/${token}`
};

export const USERS = {
    ME: `${API_BASE}/users/me`,
    ALL: `${API_BASE}/users`,
    CHANGE_ROLE: (id) => `${API_BASE}/users/${id}/role`,
    DELETE: (id) => `${API_BASE}/users/${id}`
};

export const USERINFO = {
    CREATE: `${API_BASE}/userinfo/createProfile`,
    GET: `${API_BASE}/userinfo/getProfile`,
    UPDATE: `${API_BASE}/userinfo/updateProfile`,
    CRUD_BASE: `${API_BASE}/userinfo`
};

export const CONTACT = {
    CREATE: `${API_BASE}/contact/createContact`,
    GET: `${API_BASE}/contact/getContact`,
    UPDATE: `${API_BASE}/contact/updateContact`
};