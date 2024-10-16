import { auth, auth0Auth } from "$lib/server/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/**
 * Sends a GET request to authenticate a user.
 *
 * @param {Object} options - The request options.
 * @param {string} options.url - The URL to send the request to.
 * @param {Object} options.cookies - The cookies object.
 * @param {Object} options.locals - The locals object.
 * @returns {Promise<Response>} - The response of the GET request.
 * @throws {OAuthRequestError} - If the code is invalid.
 */
export const GET = async ({ url, cookies, locals }) => {
  const session = await locals.auth.validate();
  if (session) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });
  }
  const storedState = cookies.get("oauth_state");
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400
    });
  }
  try {
    const { getExistingUser, auth0User, createUser, auth0Tokens } = await auth0Auth.validateCallback(code);

    /**
     * Retrieves the user from the database.
     * If the user already exists, returns the existing user.
     * If the user doesn't exist, creates a new user with the provided attributes.
     *
     * @returns {Promise} A promise that resolves to the user object.
     */
    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;
      return await createUser({
        attributes: {
          username: auth0User.name,
          image: auth0User.picture,
          sub: auth0User.sub
        }
      });
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {
        auth_token: auth0Tokens.idToken
      }
    });

    locals.auth.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400
      });
    }
    console.log(e);
    return new Response(null, {
      status: 500
    });
  }
};
