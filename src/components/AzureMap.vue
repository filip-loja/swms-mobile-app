<template>
	<div id="azure-map">
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import * as atlas from 'azure-maps-control'
import { useStore } from '@/store'
import {DataPoint} from '@/store/store'
export default defineComponent({
	name: 'AzureMap',
	emits: ['selected'],
	setup (props, { emit }) {

		const store = useStore()
		const mapKey = computed<string>(() => store.state.azureKey)

		onMounted(() => {

			const map = new atlas.Map('azure-map', {
				authOptions: {
					authType: atlas.AuthenticationType.subscriptionKey,
					subscriptionKey: mapKey.value
				},
				enableAccessibility: false,
				showFeedbackLink: false,
				showLogo: false,
				language: 'en-US',
				minZoom: 15,
				maxZoom: 18,
				view: 'auto',
			})

			const dataSource = new atlas.source.DataSource()
			const layer = new atlas.layer.SymbolLayer(dataSource)

			const points = [
				{id: 1, lon: 18.620, lat: 48.771, type: 'plastic'},
				{id: 2, lon: 18.621111, lat: 48.771, type: 'paper'}
			]

			const colors = {
				'plastic': '#FECA18',
				'paper': '#13A8E1',
				'glass': '#75B73B',
				'metal': '#E61C29',
				'mixed': '#4E4C4A',
			}

			function generateMarkers (points: any) {
				return points.map((point: any) => {
					const marker = new atlas.HtmlMarker({
						// @ts-ignore
						color: colors[point.type],
						position: [point.lon, point.lat]
					})
					// @ts-ignore
					marker['properties'] = point
					return marker
				})
			}

			const markers = generateMarkers(points)

			map.events.add('ready', () => {

				map.sources.add(dataSource)
				map.layers.add(layer)

				for (let i = 0; i < markers.length; i++) {
					map.markers.add(markers[i])
				}

				map.setCamera({
					center: [18.620, 48.771],
					maxBounds: new atlas.data.BoundingBox([18.591718, 48.759056], [18.652761, 48.792376])
				});

			})

			const markerClick = (e: any) => {
				const payload: DataPoint = e.target.properties
				emit('selected', payload)
			}

			const attachEvents = (markers: any) => {
				for (let i = 0; i < markers.length; i++) {
					map.events.add('click', markers[i], markerClick)
				}
			}

			// const detachEvents = (markers: any) => {
			// 	for (let i = 0; i < markers.length; i++) {
			// 		map.events.remove('click', markers[i], markerClick)
			// 	}
			// }

			attachEvents(markers)
			// setTimeout(() => {
			// 	detachEvents(markers)
			// 	console.log('removed')
			// }, 4000)

		})

		return {

		}
	}
})
</script>

<style scoped>

	#azure-map {
		display: block;
		width: 100vw;
		height: calc(100vh - 56px);
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

</style>
