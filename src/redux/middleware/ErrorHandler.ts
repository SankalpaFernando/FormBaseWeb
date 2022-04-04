import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.log("🚀 ~ file: ErrorHandler.ts ~ line 13 ~ action", action)
      // 401; Unauthorized Code
      if (action.payload.status === 401) {
        window.location.href = 'http://localhost:3000/login';
      }
    }

    return next(action);
  };
