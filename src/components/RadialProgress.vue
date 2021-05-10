<template>
	<div class='container'>
		<svg width='120' height='120' class='chart-container'>
			<circle cx='60' cy='60' :r='radius' class='back' fill='none' />
			<circle cx='60' cy='60' :r='radius' class='front' fill='none' :style="{strokeDasharray: dasharray}" />
			<g class='text'>
				<text x='60' y='60' alignment-baseline="central" text-anchor="middle" id='percentage'>
					{{ percentageStr }}%
				</text>
			</g>
		</svg>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
	name: 'RadialProgress',
	props: {
		fullness: { type: Number, required: true }
	},
	setup (props) {
		const radius = ref<number>(45)
		const dashBase = 2 * 3.20 * radius.value
		const percentage = ref<number>(0)
		const percentageStr = ref<string>('0')
		const dasharray = ref<string>('0,1000000')

		const animate = () => {
			dasharray.value = (dashBase * (percentage.value / 100)) + ',1000000'
			percentage.value += 0.5
			percentageStr.value = Math.round(percentage.value).toString()
			if (percentage.value >= props.fullness) {
				percentage.value = Math.round(props.fullness)
				percentageStr.value = (percentage.value > 100 ? 100 : percentage.value).toString()
				return
			} else {
				window.requestAnimationFrame(animate)
			}
		}

		animate()

		return {
			radius,
			dasharray,
			percentage,
			percentageStr
		}
	}
})
</script>

<style scoped>
	/* https://medium.com/@josephwong2004/how-to-do-x-in-css-radial-progress-chart-317f10994c08 */

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 150px;
	}

	.container .chart-container .back {
		stroke: #8d99ae;
		stroke-width: 10;
	}
	.container .chart-container .front {
		stroke: #08415c;
		stroke-width: 10;
		stroke-linecap: round;
		stroke-dasharray: 0;
		transform: rotate(-90deg);
		transform-origin: center;
	}
	.container .chart-container .text {
		font-size: 24px;
		fill: #063045;
		opacity: 0;
		transform: translateY(30%);
		animation: display 1s forwards;
	}

	@keyframes display {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

</style>
