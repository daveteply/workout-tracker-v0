export interface ServerActionResponse {
  success: boolean;
  message?: string;
}

export const HEADER_JSON = { 'Content-Type': 'application/json' };
export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_CREATED = 201;

export const API_STRUCTURE_URL = process.env.API_STRUCTURE_URL;
export const API_TRACKING_URL = process.env.API_TRACKING_URL;

export const MEMBER_COOKIE_KEY = 'member';

export const SESSION_HISTORY_LIMIT = 4;
export const ITEMS_PER_PAGE = 10;
