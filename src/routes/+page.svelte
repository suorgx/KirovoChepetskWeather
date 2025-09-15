<script>
    import { onMount } from 'svelte';

    let data = [];

    onMount(async () => {
        const res = await fetch('/api/data');
        data = await res.json();
    });
</script>

<div class="flex flex-col flex-wrap md:flex-row gap-6">

    {#each data.slice(0, 18) as year}
        <div class="flex-1 bg-white p-4 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">{year["year"]}: {year["average"]}</h3>
            <button class="mt-4 w-fit bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-300 transition duration-300">Подробнее</button>
        </div>
    {/each}
</div>

