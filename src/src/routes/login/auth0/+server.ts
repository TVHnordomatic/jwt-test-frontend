import {dev} from "$app/environment";
import {auth0Auth} from "$lib/server/lucia.js";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/**
 * Performs a GET request for authentication.
 *
 * @param {Object} params - The parameters for the GET request.
 * @param {Object} params.cookies - The cookies object.
 * @param {Object} params.locals - The locals object.
 * @returns {Response} - The response object.
 */
export const GET = async ({cookies, locals}) => {
    const session = await locals.auth.validate();
    if (session) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    }
    const [url, state] = await auth0Auth.getAuthorizationUrl();
    cookies.set("oauth_state", state, {
        httpOnly: true,
        secure: !dev,
        path: "/",
        maxAge: 60 * 60
    });
    return new Response(null, {
        status: 302,
        headers: {
            Location: url.toString()
        }
    });
};