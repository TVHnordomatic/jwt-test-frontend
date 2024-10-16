<script lang="ts">
    import Logo from "$lib/images/nordomatic-logo.svg"
</script>

<div class="min-h-full">
    <nav class="bg-[#250e62]">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="h-8 w-32" src="{Logo}" alt="Your Company">
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <slot />
</div>
