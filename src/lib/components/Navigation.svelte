<script lang="ts">
    import Logo from "$lib/images/nordomatic-logo.svg"
</script>

<div class="min-h-full">
    <nav class="bg-[#250e62]">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="h-8 w-32" src="{Logo}" alt="Nordomatic Property Technology">
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                            <p class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#301a6a] hover:text-white" aria-current="page">JWT test environment</p>
                            <a href="/logout" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#301a6a] hover:text-white" aria-current="page">Log out</a>
<!--                            <a href="/" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#301a6a] hover:text-white">Project</a>-->
<!--                            <a href="/service" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#301a6a] hover:text-white">Service</a>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <slot />
</div>
