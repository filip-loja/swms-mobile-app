<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>SWMS App</ion-title>
				<ion-buttons slot="end">
					<ion-button expand="block" @click="showModalAbout">
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
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, modalController  } from '@ionic/vue'
import { defineComponent } from 'vue'
import { helpCircleOutline } from 'ionicons/icons'
import ModalAbout from '@/components/ModalAbout.vue'

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
		IonIcon
  },
	setup () {

		const showModalAbout = async () => {
			const modal = await modalController
				.create({
					component: ModalAbout
				})
			return modal.present()
		}

		return {
			helpCircleOutline,
			showModalAbout
		}
	}
})
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
