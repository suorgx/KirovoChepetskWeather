<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import type { ChartConfiguration } from 'chart.js';
	import type { ForecastHour } from '../interfaces/WeatherResponse';

	let { hours }: { hours: ForecastHour[] } = $props();
	let canvas: HTMLCanvasElement;

	onMount(() => {
		if (!hours || hours.length === 0) return;

		const hourLabels = hours.map((h) => {
			const date = new Date(h.time);
			return date.getHours().toString().padStart(2, '0') + ':00';
		});

		const temperatures = hours.map((h) => h.temp_c);

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const config: ChartConfiguration<'line'> = {
			type: 'line',
			data: {
				labels: hourLabels,
				datasets: [
					{
						data: temperatures,
						tension: 0.4,
						pointRadius: 5,
						pointHoverRadius: 6
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						callbacks: {
							label: (context) => {
								return `${context.parsed.y.toFixed(1)}°C`;
							}
						}
					}
				},
				scales: {
					x: {
						ticks: { autoSkip: true, maxRotation: 45, minRotation: 45 }
					},
					y: {
						beginAtZero: false,
						ticks: {
							callback: function (value) {
								return typeof value === 'number' ? value.toFixed(1) + '°C' : value;
							}
						}
					}
				}
			}
		};

		new Chart(ctx, config);
	});
</script>

<div class="w-full h-64">
	<canvas bind:this={canvas}></canvas>
</div>
