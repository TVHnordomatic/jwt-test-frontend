import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

/**
 * Calculates the load of the layout server based on the provided session information.
 *
 * @param {Object} locals - The local variables of the current request.
 * @param {Object} locals.auth - The authentication information.
 *
 * @returns {Object} - The load information of the layout server.
 * @returns {string} userId - The ID of the user.
 * @returns {string} Username - The username of the user.
 * @returns {string} Image - The image URL of the user.
 */
export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) redirect(302, "/login/auth0");

  return {
    userId: session.user.userId,
    Username: session.user.username,
    Image: session.user.image
  };
};

