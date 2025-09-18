<script lang="ts">
	import type { WeatherResponse } from '../interfaces/WeatherResponse';

	let { weather }: { weather: WeatherResponse } = $props();
</script>

<header class="flex items-center justify-between p-6">
	<div>
		<h2 class="text-xl font-semibold text-gray-800">Кирово-Чепецк, Погода в этот день</h2>
		<p class="text-gray-500">{weather.location.localtime}</p>
	</div>

	<div class="flex items-center space-x-4">
		<img src={weather.current.condition.icon} alt="Погода" class="w-16 h-16" />
		<div class="text-right">
			<h3 class="text-lg font-semibold text-gray-800">
				{weather.location.name}, {weather.location.country}
			</h3>
			<p class="text-2xl font-bold text-gray-900">{weather.current.temp_c}°C</p>
			<p class="text-gray-500">{weather.current.condition.text}</p>
		</div>
	</div>
</header>
