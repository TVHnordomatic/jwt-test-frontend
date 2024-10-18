import { error, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import { AUTH0_CLIENT_DOMAIN, AUTH0_CLIENT_ID, LOGOUT_URL } from "$env/static/private";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/**
 * Function to handle GET request.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.locals - The locals object.
 * @returns {Promise<void>} - A promise that resolves to nothing.
 */
export const GET = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) return error(401);
  await auth.invalidateSession(session.sessionId); // invalidate session
  locals.auth.setSession(null); // remove cookie
  redirect(302, AUTH0_CLIENT_DOMAIN + "v2/logout?returnTo=" + LOGOUT_URL + "&client_id=" + AUTH0_CLIENT_ID); // redirect to login page
};