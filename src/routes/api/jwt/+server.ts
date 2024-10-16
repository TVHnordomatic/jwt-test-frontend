import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
    try {
        // Validate session and authentication
        const session = await locals.auth.validate();
        if (!session || !session.auth_token) {
            return json({ success: false, message: 'Not Authorized' }, { status: 401 });
        }

        // Returning the full session object in the response
        return json({
            success: true,
            session: session // Including the full session in the response
        }, { status: 200 });

    } catch (error) {
        console.error('Unexpected error:', error);

        if (error instanceof SyntaxError) {
            return json({ success: false, message: 'Invalid JSON format' }, { status: 400 });
        }

        return json({ success: false, message: 'Er is een fout opgetreden' }, { status: 500 });
    }
}