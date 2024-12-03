import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { auth0 } from "@lucia-auth/oauth/providers";
import { dev } from "$app/environment";
import {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_CLIENT_DOMAIN,
  AUTH0_CLIENT_CALLBACK_URL,
  POSTGRES_URL,
  POSTGRES_SSL
} from "$env/static/private";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";
import postgres from "postgres";

/**
 * Represents a PostgreSQL database connection.
 *
 * @typedef {Object} SQL
 * @property {string} POSTGRES_URL - The URL of the PostgreSQL database.
 * @property {boolean} POSTGRES_SSL - Indicates whether SSL should be used for the connection.
 */
const sql = postgres(POSTGRES_URL + POSTGRES_SSL);

/**
 * Creates an instance of the `auth` object.
 *
 * @param {Object} options - The configuration options for `auth`.
 * @param {Object} options.adapter - The adapter for the database.
 * @param {Object} options.adapter.user - The user data table configuration.
 * @param {Object} options.adapter.session - The user session table configuration.
 * @param {Object} options.adapter.key - The user key data table configuration.
 * @param {Object} options.middleware - The middleware configuration.
 * @param {string} options.env - The environment setting ("DEV" or "PROD").
 * @param {Function} options.getUserAttributes - A function that maps user data fields to user attribute fields.
 * @param {Function} options.getSessionAttributes - A function that maps database session fields to session attribute fields.
 */
export const auth = lucia({
  adapter: postgresAdapter(sql, {
    user: 'user',
    session: 'user_session',
    key: 'user_key'
  }),
  middleware: sveltekit(),
  env: dev ? "DEV" : "PROD",

  getUserAttributes: (data) => {
    return {
      username: data.username,
      image: data.image,
      sub: data.sub
    };
  },

  getSessionAttributes: (databaseSession) => {
    return {
      auth_token: databaseSession.auth_token
    };
  }
});

/**
 * Instantiates an Auth0 authentication client with the provided credentials.
 *
 * @param {Object} auth - The Auth0 object containing the required credentials.
 * @param {string} auth.clientId - The Auth0 client id.
 * @param {string} auth.appDomain - The Auth0 client domain.
 * @param {string} auth.redirectUri - The Auth0 client callback URL.
 * @param {string} auth.clientSecret - The Auth0 client secret.
 * @param {string} auth.scope - The Auth0 client secret.
 *
 * @returns {Object} - An instance of the Auth0 authentication client.
 */
export const auth0Auth = auth0(auth, {
  clientId: AUTH0_CLIENT_ID,
  appDomain: AUTH0_CLIENT_DOMAIN,
  redirectUri: AUTH0_CLIENT_CALLBACK_URL,
  clientSecret: AUTH0_CLIENT_SECRET,
  scope: 'openID profile email'
});

/**
 * Auth class responsible for authentication functionality.
 */
export type Auth = typeof auth;