<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import Header from "$lib/components/Header.svelte"
    import ProjectForm from "$lib/components/ProjectForm.svelte";

    let header = "Project Formulier"
</script>

<svelte:head>
    <title>Project Formulier - Portal</title>
</svelte:head>

<Navigation>
    <Header bind:header={header} />
    <main>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <ProjectForm />
        </div>
    </main>
</Navigation>