<template>
	<div id="azure-map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, watch } from 'vue'
import * as atlas from 'azure-maps-control'
import { useStore } from '@/store'
import { DataPoint, GarbageTypeColors, MapChangePayload } from '@/store/store'
import { createMapViewBounds, generateMarkers } from '@/utils'
export default defineComponent({
	name: 'AzureMap',
	emits: ['selected', 'change'],
	setup (props, { emit }) {

		const store = useStore()
		const mapKey = computed<string>(() => store.state.azureKey)
		const colors = computed<GarbageTypeColors>(() => store.state.garbageTypeColors)
		const points = computed<DataPoint[]>(() => store.getters['activePoints'])
		const defaultCamera = computed(() => store.state.defaultCamera)
		let markers: any = []

		const markerClick = (e: any) => {
			const payload: DataPoint = e.target.properties
			emit('selected', payload)
		}

		const attachEvents = (map: any, markers: any) => {
			for (let i = 0; i < markers.length; i++) {
				map.events.add('click', markers[i], markerClick)
			}
		}

		const detachEvents = (map: any, markers: any) => {
			for (let i = 0; i < markers.length; i++) {
				map.events.remove('click', markers[i], markerClick)
			}
		}

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

			map.events.add('ready', () => {
				map.sources.add(dataSource)
				map.layers.add(layer)
				map.setCamera(defaultCamera.value)

				watch(() => points.value, (newPoints: DataPoint[]) => {
					detachEvents(map, markers)
					map.markers.clear()
					markers = generateMarkers(newPoints, colors.value)
					for (let i = 0; i < markers.length; i++) {
						map.markers.add(markers[i])
					}
					attachEvents(map, markers)
				}, { immediate: true })
			})

			/** Reacts to changes to map zoom level and its visible area (camera's bounding box) */
			map.events.add('moveend', () => {
				const camera = map.getCamera()
				const payload: MapChangePayload = {
					zoom: camera.zoom,
					bounds: createMapViewBounds(camera.bounds)
				}
				emit('change', payload)
			})

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
