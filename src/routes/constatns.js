// Authentication
export const R_AUTH = "/auth";
export const R_LOGIN = `${R_AUTH}/login`;
export const R_REGISTER = `${R_AUTH}/register`;
// Errors
export const R_E = "/error";
export const R_E_404 = `${R_E}/404`;
// Admin
export const R_ADMIN = "/admin";
export const R_USERS = `${R_ADMIN}/users`;
export const R_ANALYTICS = `${R_ADMIN}/analytics`;

// Manager
export const R_MANAGER = "/manager";
export const R_EMPLOYESS = `${R_MANAGER}/employees`;
// Finanace
export const R_FINANCE = "/finance";
export const R_FINANCE_LIST = `${R_FINANCE}/list`;
export const R_FINANCE_DETAIL = (financeId) =>
  `${R_FINANCE}/detail/${financeId}`;
