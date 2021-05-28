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
			<radial-progress :fullness="binFullness" v-if="binFullness && binFullness > -1" class="radial-progress" :type="garbageType" />
		</div>

		<div class="garbage-type">
			{{ garbageType }}
		</div>
		<br />

		<transition name="slide">
			<div class="report-form" v-if="reportForm">
				<ion-textarea placeholder="Write your message here" v-model="reportMessage" rows="6"></ion-textarea>
				<ion-row class="ion-justify-content-center">
					<ion-button :disabled="!reportForm" class="tall-btn" @click="finishReportForm(false)" color="danger">Cancel</ion-button>
					<ion-button :disabled="!reportForm" class="tall-btn" @click="finishReportForm(true)">Send</ion-button>
				</ion-row>
			</div>
		</transition>

		<transition name="slide">
			<ion-button v-if="!reportForm" expand="block" @click="reportForm = true" class="tall-btn" :disabled="reportForm">
				Report problem
			</ion-button>
		</transition>

	</ion-content>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, modalController, IonTextarea, IonRow, toastController } from '@ionic/vue'
import { defineComponent, computed, PropType, ref } from 'vue'
import { closeOutline } from 'ionicons/icons'
import { useStore } from '@/store'
import {DataPoint, GarbageTypeDef} from '@/store/store'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {capitalize} from '@/utils'
import RadialProgress from '@/components/RadialProgress.vue'
import {loadFullness, sendProblemReport} from '@/http'

export default defineComponent({
	name: 'ModalBinDetail',
	components: { RadialProgress, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonTextarea, IonRow },
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
		const reportMessage = ref<string>('')
		const finishReportForm = async (send: boolean) => {
			const message = reportMessage.value.trim()
			if (!message.length && send) {
				const toast = await toastController
					.create({ message: 'No message!', position: 'bottom', duration: 1000, color: 'danger' })
				await toast.present()
				return
			}
			if (send) {
				sendProblemReport(props.data.binId, props.data.type, message)
				const toast = await toastController
					.create({ message: 'Thank you for your message.', position: 'bottom', duration: 2000, color: 'success' })
				await toast.present()
			}
			reportForm.value = false
			reportMessage.value = ''
		}

		// @ts-ignore
		const binFullness = ref<number>(null)
		loadFullness(props.data.binId)
			.then(fullness => binFullness.value = Math.round(fullness))
			.catch(() => null)

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
			binFullness,
			reportMessage,
			finishReportForm
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

	.report-form {
		border-top: 1px solid rgba(0,0,0,0.3);
		border-bottom: 1px solid rgba(0,0,0,0.3);
		display: block;
		overflow: hidden;
		box-sizing: border-box;
	}

	.report-form .tall-btn {
		width: 40%;
		margin: 0 10px 10px;
	}


	.slide-enter-active, .slide-leave-active {
		transition: max-height 500ms ease-out;
	}

	.slide-enter-from { max-height: 0; }
	.slide-enter-to { max-height: 400px; }

	.slide-leave-from { max-height: 400px; }
	.slide-leave-to { max-height: 0; }
</style>
