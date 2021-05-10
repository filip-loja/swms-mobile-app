<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>Garbage Bin Detail</ion-title>
			<ion-buttons slot="end">
				<ion-button expand="block" @click="closeModal">
					<ion-icon slot="icon-only" :icon="closeOutline" />
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">

		<div class="coordinates-title">&nbsp;&nbsp;&nbsp;Latitude x Longitude</div>
		<div class="coordinates">
			<div>{{ latitude }}</div>x<div> {{ longitude }}</div>
		</div>

		<div class="img-container">
			<img :src="imageSrc" />
			<radial-progress :fullness="binFullness" v-if="binFullness" class="radial-progress" />
		</div>

		<div class="garbage-type">
			{{ garbageType }}
		</div>

		<br />
		<ion-button v-if="!reportForm" expand="block" @click="reportForm = true" class="tall-btn">
			Report problem
		</ion-button>

	</ion-content>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, modalController } from '@ionic/vue'
import { defineComponent, computed, PropType, ref } from 'vue'
import { closeOutline } from 'ionicons/icons'
import { useStore } from '@/store'
import {DataPoint, GarbageTypeDef} from '@/store/store'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { capitalize, loadFullness } from '@/utils'
import RadialProgress from '@/components/RadialProgress.vue'

export default defineComponent({
	name: 'ModalBinDetail',
	components: { RadialProgress, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon },
	props: {
		data: { type: Object as PropType<DataPoint>, required: true }
	},
	setup (props) {
		const store = useStore()

		const garbageTypeDefs = computed<GarbageTypeDef>(() => store.state.garbageTypeDefs)

		// @ts-ignore
		const imageSrc = computed<string>(() => garbageTypeDefs.value[props.data.type])
		const garbageType = computed<string>(() => capitalize(props.data.type))
		const latitude = computed<string>(() => props.data.lat.toFixed(6))
		const longitude = computed<string>(() => props.data.lon.toFixed(6))
		const reportForm = ref<boolean>(false)

		// @ts-ignore
		const binFullness = ref<number>(null)
		loadFullness(props.data.id).then(fullness => binFullness.value = Math.round(fullness))

		const closeModal = async () => await modalController.dismiss()


		return {
			closeOutline,
			closeModal,
			garbageTypeDefs,
			imageSrc,
			garbageType,
			reportForm,
			latitude,
			longitude,
			binFullness
		}
	}
})
</script>

<style scoped>

	.img-container {
		display: block;
		width: 100%;
		position: relative;
		margin-top: -15px;
		margin-bottom: -15px;
	}

	.img-container img {
		display: block;
		width: 240px;
		margin: 0 auto;
	}

	.img-container .radial-progress {
		position: absolute;
		top: 63%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.garbage-type {
		text-align: center;
		font-size: 1.3em;
		font-weight: bold;
	}

	.coordinates {
		display: flex;
		justify-content: center;
		font-weight: bold;
		font-family: monospace;
	}

	.coordinates div {
		padding: 0 10px;
	}

	.coordinates-title {
		text-align: center;
		font-size: 0.7em;
		color: #808289;
		padding-bottom: 5px;
	}


</style>
