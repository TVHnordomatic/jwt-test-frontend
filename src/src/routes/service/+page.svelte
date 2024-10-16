<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import Header from "$lib/components/Header.svelte"
    import ServiceForm from "$lib/components/ServiceForm.svelte";

    let header = "Service Formulier"
</script>

<svelte:head>
    <title>Service Formulier - Portal</title>
</svelte:head>

<Navigation>
    <Header bind:header={header} />
    <main>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <ServiceForm />
        </div>
    </main>
</Navigation>