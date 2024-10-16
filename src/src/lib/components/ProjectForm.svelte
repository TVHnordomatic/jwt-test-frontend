<script lang="ts">
    import { goto } from '$app/navigation';

    let projectReference = '';
    let projectName = '';
    let contractAmount = '';
    let reference = '';
    let projectManager = '';

    let errorMessage = '';

    async function handleSubmit(event: Event) {
        event.preventDefault();

        // Check if required fields are filled
        if (!projectReference || !projectName || !contractAmount || !reference || !projectManager) {
            errorMessage = 'Alle velden zijn verplicht';
            return;
        }

        // Prepare form data
        const formData = {
            project_reference: projectReference,
            project_name: projectName,
            contract_amount: contractAmount,
            reference: reference,
            project_manager: projectManager
        };

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Er ging iets fout met de API');
            }

            // If the project creation is successful, navigate to the project portal
            if (result.success && result.data && result.data.project_id) {
                const projectId = result.data.project_id;
                window.location.href = 'https://portal.y-con.nl/project/' + projectId;
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
                    <label for="project-reference" class="block text-sm font-medium leading-6 text-gray-900">Project Referentie</label>
                    <div class="mt-2">
                        <input type="text" id="project-reference" bind:value={projectReference} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="project-name" class="block text-sm font-medium leading-6 text-gray-900">Projectnaam</label>
                    <div class="mt-2">
                        <input type="text" id="project-name" bind:value={projectName} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="sm:col-span-6">
                    <label for="contract-amount" class="block text-sm font-medium leading-6 text-gray-900">Opdrachtbedrag</label>
                    <div class="mt-2">
                        <input type="number" step=".01" id="contract-amount" bind:value={contractAmount} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="sm:col-span-6">
                    <label for="reference" class="block text-sm font-medium leading-6 text-gray-900">Opdracht Referentie</label>
                    <div class="mt-2">
                        <input type="text" id="reference" bind:value={reference} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="project-manager" class="block text-sm font-medium leading-6 text-gray-900">Projectmanager</label>
                    <div class="mt-2">
                        <select id="project-manager" bind:value={projectManager} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option value="John de Kroon">John de Kroon</option>
                            <option value="Felicia Brosens">Felicia Brosens</option>
                            <option value="Wilco Versteeg">Wilco Versteeg</option>
                            <option value="Lyon van Hest">Lyon van Hest</option>
                            <option value="Lotte van Hest">Lotte van Hest</option>
                            <option value="Niels Leijen">Niels Leijen</option>
                            <option value="Piet van der Zanden">Piet van der Zanden</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        {#if errorMessage}
            <p class="text-red-500 text-sm">{errorMessage}</p>
        {/if}

    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Annuleer</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Opslaan</button>
    </div>
</form>