<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import Header from "$lib/components/Header.svelte";

    let header = "SAML Test environment";
    const samlVersion = '2.0';
    const issuer = 'urn:nordomatic-dev.eu.auth0.com';
    const certLink = 'const certLink = \'/saml/Nordomatic%20Dev.pem\'';
    const sha1Fingerprint = '3D:CB:A5:C7:07:A0:5F:D7:15:60:C1:CE:43:84:09:BC:A9:30:B0:29';
    const loginUrl = 'https://nordomatic-dev.eu.auth0.com/samlp/MXXh2R8pDXX9qwTD6m0xlEGFBwzc0XZk';
    const metadataLink = '/saml/Nordomatic%20Metadata.xml';
    const googleConnection = `${loginUrl}?connection=google-oauth2`;
    const usernamePasswordConnection = `${loginUrl}?connection=Username-Password-Authentication`;
</script>

<svelte:head>
    <title>SAML Test environment</title>
</svelte:head>

<Navigation>
    <Header bind:header={header} />
    <main>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 class="text-2xl font-bold mb-4">SAML Protocol Configuration Parameters</h2>

            <div class="bg-white border border-gray-200 p-6 rounded-lg">
                <p><strong>SAML Version:</strong> {samlVersion}</p>
                <p><strong>Issuer:</strong> {issuer}</p>
                <p><strong>Identity Provider Certificate:</strong> <a href={certLink} class="text-blue-500 underline">Download Auth0 certificate</a></p>
                <p><strong>Identity Provider SHA1 fingerprint:</strong> {sha1Fingerprint}</p>
                <p><strong>Identity Provider Login URL:</strong> <a href={loginUrl} class="text-blue-500 underline">{loginUrl}</a></p>
                <p><strong>Identity Provider Metadata:</strong> <a href={metadataLink} class="text-blue-500 underline">Download</a></p>
            </div>

            <h3 class="text-xl font-bold mt-6 mb-4">Alternatively, you can add a connection parameter:</h3>
            <div class="bg-white border border-gray-200 p-6 rounded-lg">
                <p><a href={googleConnection} class="text-blue-500 underline">{googleConnection}</a></p>
                <p><a href={usernamePasswordConnection} class="text-blue-500 underline">{usernamePasswordConnection}</a></p>
                <p class="mt-4">In this case, Auth0 will redirect users to the specified connection and will not display the Login Widget. Make sure you send the SAMLRequest using HTTP POST.</p>
            </div>
        </div>
    </main>
</Navigation>