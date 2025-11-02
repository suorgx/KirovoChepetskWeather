<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import type { ChartConfiguration } from 'chart.js';
	import type { WeatherResponse } from '../interfaces/WeatherResponse';
	import type { DataPoint } from '../interfaces/DataPoint';

	let { weather, data }: { weather: WeatherResponse; data: DataPoint[] } = $props();
	let canvas: HTMLCanvasElement;

	console.log(weather.location.localtime, data);

	onMount(() => {
		const yearLabels = data.map((d) => d.year);
		const avgValues = data.map((d) => d.average - 10);

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const config: ChartConfiguration<'line'> = {
			type: 'line',
			data: {
				labels: yearLabels,
				datasets: [
					{
						data: avgValues,
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
								return `${context.parsed.y}°C`;
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
