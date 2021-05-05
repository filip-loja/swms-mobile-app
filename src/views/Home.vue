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

      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>

				<ion-fab vertical="bottom" horizontal="end" slot="fixed">
					<ion-fab-button @click="showModal('filter')">
						<ion-icon :icon="funnelOutline" class="ion-color-light" />
					</ion-fab-button>
				</ion-fab>

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, modalController, IonFab, IonFabButton } from '@ionic/vue'
import { defineComponent } from 'vue'
import { helpCircleOutline, funnelOutline } from 'ionicons/icons'
import ModalAbout from '@/components/ModalAbout.vue'
import ModalFilter from '@/components/ModalFilter.vue'

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
		IonFabButton
  },
	setup () {

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

		return {
			helpCircleOutline,
			funnelOutline,
			showModal
		}
	}
})
</script>

<style scoped>


</style>
