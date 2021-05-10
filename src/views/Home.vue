<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>SWMS App</ion-title>
				<ion-buttons slot="end">
					<ion-button expand="block" @click="showModal('about')">
						<ion-icon slot="icon-only" :icon="helpCircleOutline" />
					</ion-button>
				</ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

			<transition name="fade">
				<main-spinner class="main-spinner" v-if="!renderMap" />
			</transition>

			<azure-map v-if="renderMap" @selected="showBinDetail" />

			<ion-fab vertical="bottom" horizontal="end" slot="fixed">
				<ion-badge v-if="filteredTypesCount" color="secondary" class="filter-badge">{{ filteredTypesCount }}</ion-badge>
				<ion-fab-button @click="showModal('filter')">
					<ion-icon :icon="funnelOutline" class="ion-color-light" />
				</ion-fab-button>
			</ion-fab>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, modalController, IonFab, IonFabButton, IonBadge } from '@ionic/vue'
import { computed, defineComponent, ref, onMounted } from 'vue'
import { helpCircleOutline, funnelOutline } from 'ionicons/icons'
import ModalAbout from '@/components/ModalAbout.vue'
import ModalFilter from '@/components/ModalFilter.vue'
import ModalBinDetail from '@/components/ModalBinDetail.vue'
import AzureMap from '@/components/AzureMap.vue'
import MainSpinner from '@/components/MainSpinner.vue'
import { useStore } from '@/store'
import {DataPoint} from '@/store/store'

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
		IonButtons,
		IonButton,
		IonIcon,
		IonFab,
		IonFabButton,
		IonBadge,
		AzureMap,
		MainSpinner
  },
	setup () {
		const store = useStore()

		const filteredTypesCount = computed<number>(() => store.state.filteredGarbageTypes.length)
		const renderMap = ref<boolean>(false)

		onMounted(() => {
			setTimeout(() => renderMap.value = true, 1500)
		})

		const modals = {
			about: ModalAbout,
			filter: ModalFilter
		}

		const showModal = async (name: 'about' | 'filter') => {
			const modalCmp = modals[name]
			if (!modalCmp) return

			const modal = await modalController
				.create({
					component: modalCmp
				})
			return modal.present()
		}

		const showBinDetail = async (data: DataPoint) => {
			const modal = await modalController
				.create({
					component: ModalBinDetail,
					componentProps: {
						data
					}
				})
			return modal.present()
		}

		return {
			helpCircleOutline,
			funnelOutline,
			showModal,
			showBinDetail,
			filteredTypesCount,
			renderMap
		}
	}
})
</script>

<style scoped>

	.filter-badge {
		position: absolute;
		right: 0;
		z-index: 10;
		top: -10px;
		width: 20px;
		border-radius: 50%;
	}

	.main-spinner {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity 1s ease;
	}

	.fade-enter-from, .fade-leave-to {
		opacity: 0;
	}

</style>
