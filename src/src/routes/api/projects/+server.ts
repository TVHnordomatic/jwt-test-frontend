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

        const bearerToken = session.auth_token;

        // Validate form fields
        if (!formData.project_reference || !formData.project_name || !formData.contract_amount || !formData.reference || !formData.project_manager) {
            return json({ success: false, message: 'Alle velden zijn verplicht' }, { status: 400 });
        }

        // Prepare the request options for the external API
        const externalAPIUrl = 'https://api.y-con.nl/projects';
        const requestBody = {
            "project_reference": formData.project_reference,
            "project_name": formData.project_name,
            "contract_amount": formData.contract_amount,
            "reference": formData.reference,
            "project_manager": formData.project_manager
        };

        const externalResponse = await fetch(externalAPIUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearerToken
            },
            body: JSON.stringify(requestBody),
        });

        // Log the raw response to understand what is being returned
        const responseText = await externalResponse.text();  // Read as text

        // If the external API returns HTML, it indicates an issue with the API response
        if (!externalResponse.ok || externalResponse.headers.get('Content-Type') !== 'application/json') {
            return json({ success: false, message: 'Invalid response from the external API', error: responseText }, { status: externalResponse.status });
        }

        // Parse the response as JSON if everything is fine
        const result = JSON.parse(responseText);
        return json({ success: true, message: 'Project succesvol aangemaakt', data: result }, { status: 200 });

    } catch (error) {
        console.error('Unexpected error:', error);

        if (error instanceof SyntaxError) {
            return json({ success: false, message: 'Invalid JSON format' }, { status: 400 });
        }

        return json({ success: false, message: 'Er is een fout opgetreden' }, { status: 500 });
    }
}