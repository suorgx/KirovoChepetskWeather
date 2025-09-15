<script>
    import { onMount } from 'svelte';

    let data = [];

    onMount(async () => {
        const res = await fetch('/api/data');
        data = await res.json();
    });
</script>

<h1 class="text-3xl font-bold underline">
    Средняя погода в этот день в Кирово-Чепецке
</h1>

<ul class="flex flex-col gap-2">
    {#each data as year}
        <li class="w-fit rounded-lg border px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200">{year["year"]}: {year["average"]}</li>
    {/each}
</ul>

