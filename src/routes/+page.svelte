<script lang="ts">
	import HistoryChart from '../components/HistoryChart.svelte';

	// тестовые даты
	let day: number = 10;
	let month: number = 1;
</script>

<div class="grid grid-cols-2 gap-4 p-6">
	<div class="bg-white rounded-2xl shadow p-4 flex items-center justify-between">
		<div>
			<p class="text-gray-500 text-sm">Скорость ветка</p>
			<p class="text-xl font-semibold">25km/h</p>
		</div>
		<span class="text-3xl">💨</span>
	</div>
	<div class="bg-white rounded-2xl shadow p-4 flex items-center justify-between">
		<div>
			<p class="text-gray-500 text-sm">Шанс дождя</p>
			<p class="text-xl font-semibold">30%</p>
		</div>
		<span class="text-3xl">🌧️</span>
	</div>
</div>

<div class="grid grid-cols-3 gap-6 p-6">
	<div class="bg-gradient-to-br from-blue-600 to-gray-700 text-white rounded-2xl shadow p-6">
		<p class="text-sm opacity-80">Температура сейчас</p>
		<p class="text-right text-sm">Время</p>
		<div class="mt-6 text-5xl font-bold">25°C</div>
		<p class="opacity-80">Облачно</p>
	</div>

	<div class="col-span-2 bg-white rounded-2xl shadow p-6">
		<h3 class="text-gray-700 font-medium mb-4">Средняя температура в этот день, по годам</h3>
		<div class="flex items-center justify-center text-gray-400">
			<HistoryChart currentDay={day} currentMonth={month} />
		</div>
	</div>
</div>

<div class="grid grid-cols-3 gap-6 p-6">
	<div class="col-span-2 bg-white rounded-2xl shadow p-6">
		<h3 class="text-gray-700 font-medium mb-4">Восход и закат в Кирово-Чепецке</h3>
		<div class="flex justify-between items-center">
			<div>
				<p class="text-gray-500 text-sm">Восход солнца</p>
				<p class="text-lg font-semibold">05:00 AM</p>
			</div>
			<div>
				<p class="text-gray-500 text-sm">Закат</p>
				<p class="text-lg font-semibold">05:00 PM</p>
			</div>
		</div>
	</div>
</div>
