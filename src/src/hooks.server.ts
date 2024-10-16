import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

/**
 * Function handle
 *
 * @param {Object} options - The options object containing event and resolve properties.
 * @param {Object} options.event - The event object that represents the current event.
 * @param {Function} options.resolve - The function used to resolve the event.
 *
 * @returns {Promise} - A promise that resolves with the updated event object.
 */
export const handle: Handle = async ({ event, resolve }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  event.locals.auth = auth.handleRequest(event);
  return resolve(event);
};
