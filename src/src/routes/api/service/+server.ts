import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    try {
        // Parse the incoming request body
        const formData = await request.json();

        // Validate session and authentication
        const session = await locals.auth.validate();
        if (!session || !session.auth_token) {
            return json({ success: false, message: 'Niet geautoriseerd' }, { status: 401 });
        }

        const bearerToken: string = session.auth_token;

        // Validate form fields
        if (!formData.building_name || !formData.alias || !formData.street || !formData.number || !formData.place || !formData.contact_person) {
            return json({ success: false, message: 'Alle velden zijn verplicht' }, { status: 400 });
        }

        // Prepare data for external API request
        const externalAPIUrl = 'https://api.y-con.nl/service_projects';

        // Send form data to the external API
        const externalResponse = await fetch(externalAPIUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearerToken  // Add the Bearer token to the Authorization header
            },
            body: JSON.stringify(formData),
        });

        // Check if the response from the external API was successful
        if (!externalResponse.ok) {
            const errorData = await externalResponse.json(); // Get error message from external API
            return json({ success: false, message: errorData.message || 'Er ging iets fout met de externe API' }, { status: externalResponse.status });
        }

        // If the request was successful, return the response from the external API
        const result = await externalResponse.json();
        console.log(result);
        return json({ success: true, message: 'Project succesvol aangemaakt', data: result }, { status: 200 });

    } catch (error: any) {
        // Handle different error types more specifically
        if (error instanceof SyntaxError) {
            // JSON parsing error
            return json({ success: false, message: 'Invalid JSON format' }, { status: 400 });
        } else if (error instanceof TypeError) {
            // Handle other specific errors (e.g., network or undefined values)
            return json({ success: false, message: 'Type error occurred' }, { status: 500 });
        }

        // Log unexpected errors for debugging
        console.error('Unexpected error:', error);

        // Return a general error response for unexpected issues
        return json({ success: false, message: 'Er is een fout opgetreden' }, { status: 500 });
    }
}