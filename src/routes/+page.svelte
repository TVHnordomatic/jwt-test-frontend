<script lang="ts">
    import { onMount } from 'svelte';
    import Navigation from "$lib/components/Navigation.svelte";
    import Header from "$lib/components/Header.svelte";

    let header = "JWT Test environment";
    let sessionData: any = {};  // Session data object

    onMount(async () => {
        try {
            const response = await fetch('api/jwt', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                sessionData = data.session;  // Store the full session data
            } else {
                console.error('Failed to fetch session:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching session:', error);
        }
    });
</script>

<svelte:head>
    <title>JWT Test environment</title>
</svelte:head>

<Navigation>
    <Header bind:header={header} />
    <main>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 class="text-2xl font-bold mb-4">Session Data</h2>

            {#if Object.keys(sessionData).length > 0}
                <!-- Responsive table inside a scrollable container -->
                <div class="overflow-x-auto">
                    <table class="min-w-full table-auto bg-white border border-gray-200">
                        <thead>
                        <tr>
                            <th class="px-4 py-2 border text-left">Key</th>
                            <th class="px-4 py-2 border text-left">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each Object.entries(sessionData) as [key, value]}
                            <tr class="bg-gray-100 odd:bg-white">
                                <td class="px-4 py-2 border font-semibold break-words">{key}</td>
                                <td class="px-4 py-2 border break-words">{JSON.stringify(value)}</td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            {:else}
                <p>Loading session data...</p>
            {/if}
        </div>
    </main>
</Navigation>