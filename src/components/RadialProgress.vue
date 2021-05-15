<template>
	<div class='container'>
		<svg width='120' height='120' class='chart-container' :class="typeClass">
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
import { defineComponent, ref, computed, PropType } from 'vue'
import { TypeGarbage } from '@/store/store'
export default defineComponent({
	name: 'RadialProgress',
	props: {
		fullness: { type: Number, required: true },
		type: { type: String as PropType<TypeGarbage>, required: true }
	},
	setup (props) {
		const radius = ref<number>(45)
		const dashBase = 2 * 3.20 * radius.value
		const percentage = ref<number>(0)
		const percentageStr = ref<string>('0')
		const dasharray = ref<string>('0,1000000')
		const typeClass = computed<string>(() => ('bin--' + props.type).toLowerCase())

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
			percentageStr,
			typeClass
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

	.container .chart-container.bin--plastic .front { stroke: white; }
	.container .chart-container.bin--plastic .text { fill: white; }
	.container .chart-container.bin--plastic .back { stroke: rgba(24, 76, 254, 0.49); }

	.container .chart-container.bin--paper .front { stroke: white; }
	.container .chart-container.bin--paper .text { fill: white; }
	.container .chart-container.bin--paper .back { stroke: rgba(225, 76, 19, 0.81); }

	.container .chart-container.bin--glass .front { stroke: white; }
	.container .chart-container.bin--glass .text { fill: white; }
	.container .chart-container.bin--glass .back { stroke: rgba(151, 47, 99, 0.5); }

	.container .chart-container.bin--metal .front { stroke: white; }
	.container .chart-container.bin--metal .text { fill: white; }
	.container .chart-container.bin--metal .back { stroke: rgba(6, 48, 69, 0.44); }

	.container .chart-container.bin--mixed .front { stroke: white; }
	.container .chart-container.bin--mixed .text { fill: white; }
	.container .chart-container.bin--mixed .back { stroke: #063045; }

	@keyframes display {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

</style>
