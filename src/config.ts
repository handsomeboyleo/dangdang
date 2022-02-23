/**
 * WebsocketBaseURL
 */
export const apiBaseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080' // development
  : 'http://81.68.211.2/api'; // production

/**
 * WebsocketBaseURL
 */
export const wsBaseUrl = process.env.NODE_ENV === 'development'
  ? 'ws://localhost:5050?' // development
  : 'ws://81.68.211.2/ws?'; // production
