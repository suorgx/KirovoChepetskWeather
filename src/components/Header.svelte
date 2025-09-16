<script>
    let localDate = new Date().toLocaleDateString("ru-RU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
</script>

<header class="flex items-center justify-between p-6">
    <div>
        <h2 class="text-xl font-semibold text-gray-800">Кирово-Чепецк, Погода в этот день</h2>
        <p class="text-gray-500">{localDate}</p>
    </div>
</header>