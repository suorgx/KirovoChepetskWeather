<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import type { ChartConfiguration } from 'chart.js';

	interface DataPoint {
		year: number;
		average: number;
	}

	let rawData: DataPoint[] = [];
	let canvas: HTMLCanvasElement;

	onMount(async () => {
		const res = await fetch('/api/data');
		rawData = (await res.json()) as DataPoint[];

		const filtered = rawData.filter((d) => d.year % 2 === 0);

		const labels = filtered.map((d) => d.year);
		const avgValues = filtered.map((d) => d.average);

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const config: ChartConfiguration<'line'> = {
			type: 'line',
			data: {
				labels,
				datasets: [
					{
						data: avgValues,
						tension: 0.4
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: { display: false }
				},
				scales: {
					x: {
						ticks: { autoSkip: true, maxRotation: 55, minRotation: 55 }
					},
					y: { beginAtZero: true }
				}
			},
			plugins: [
				{
					id: 'customCanvasBackgroundColor',
					beforeDraw: (chart) => {
						const ctx = chart.canvas.getContext('2d');
						if (!ctx) return;
						ctx.save();
						ctx.globalCompositeOperation = 'destination-over';
						ctx.fillStyle = 'white';
						ctx.fillRect(0, 0, chart.width, chart.height);
						ctx.restore();
					}
				}
			]
		};

		new Chart(ctx, config);
	});
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
		<div
			class="bg-gradient-to-t from-blue-100 to-blue-50 rounded-lg flex items-center justify-center text-gray-400"
		>
			<canvas bind:this={canvas}></canvas>
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
