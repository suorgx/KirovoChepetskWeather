<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import type { ChartConfiguration } from 'chart.js';

	interface DataPoint {
		year: number;
		average: number;
	}

	export let currentDay: number;
	export let currentMonth: number;

	let rawData: DataPoint[] = [];
	let canvas: HTMLCanvasElement;

	onMount(async () => {
		console.log(currentMonth, currentDay)
		const res = await fetch('/api/data');
		rawData = (await res.json()) as DataPoint[];

		const filtered = rawData.filter((d) => d.year % 2 === 0).reverse();

		const yearLabels = filtered.map((d) => d.year);
		const avgValues = filtered.map((d) => d.average);

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const config: ChartConfiguration<'line'> = {
			type: 'line',
			data: {
				labels: yearLabels,
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
						ticks: { autoSkip: true, maxRotation: 45, minRotation: 45 }
					}
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

<canvas bind:this={canvas}></canvas>
