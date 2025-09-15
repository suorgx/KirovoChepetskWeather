<script>
    let localDate = new Date().toLocaleDateString("ru-RU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
</script>

<header>
    <h1 class="text-2xl font-bold mb-0">Кирово-Чепецк, Погода в этот день</h1>
    <h2 class="text-xl mb-8">{localDate}</h2>
</header>