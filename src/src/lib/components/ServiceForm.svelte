<script lang="ts">
    import { goto } from '$app/navigation';

    let buildingName = '';
    let alias = '';
    let street = '';
    let number = '';
    let place = '';
    let contactPerson = '';

    let errorMessage = '';

    async function handleSubmit(event: Event) {
        event.preventDefault();

        if (!buildingName || !alias || !street || !number || !place || !contactPerson) {
            errorMessage = 'Alle velden zijn verplicht';
            return;
        }

        const formData = {
            building_name: buildingName,
            alias,
            street,
            number,
            place,
            contact_person: contactPerson
        };

        try {
            const response = await fetch('/api/service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Er ging iets fout met de API');
            }

            // If the project creation is successful, navigate to the project portal
            if (result.success && result.data && result.data.service_project_id) {
                const projectId = result.data.service_project_id;
                window.location.href = 'https://portal.y-con.nl/service-detail/' + projectId;
            } else {
                throw new Error('Project ID niet gevonden');
            }

        } catch (error) {
            errorMessage = error instanceof Error ? error.message : 'Onbekende fout is opgetreden';
        }
    }
</script>

<form on:submit={handleSubmit}>
    <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div class="sm:col-span-3">
                    <label for="building-name" class="block text-sm font-medium text-gray-900">Gebouwnaam</label>
                    <div class="mt-2">
                        <input type="text" id="building-name" bind:value={buildingName} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="alias" class="block text-sm font-medium text-gray-900">Alias</label>
                    <div class="mt-2">
                        <input type="text" id="alias" bind:value={alias} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label for="street" class="block text-sm font-medium text-gray-900">Straat</label>
                    <div class="mt-2">
                        <input type="text" id="street" bind:value={street} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label for="number" class="block text-sm font-medium text-gray-900">Nr.</label>
                    <div class="mt-2">
                        <input type="text" id="number" bind:value={number} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label for="place" class="block text-sm font-medium text-gray-900">Plaats</label>
                    <div class="mt-2">
                        <input type="text" id="place" bind:value={place} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="sm:col-span-6">
                    <label for="contact-person" class="block text-sm font-medium text-gray-900">Contactpersoon</label>
                    <div class="mt-2">
                        <input type="text" id="contact-person" bind:value={contactPerson} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6">
                    </div>
                </div>

            </div>
        </div>
    </div>

    {#if errorMessage}
        <p class="text-red-500 text-sm">{errorMessage}</p>
    {/if}

    <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold text-gray-900">Annuleer</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-600">Opslaan</button>
    </div>
</form>