<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>About</ion-title>
			<ion-buttons slot="end">
				<ion-button expand="block" @click="closeModal">
					<ion-icon slot="icon-only" :icon="closeOutline" />
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">

		<ion-card class="ion-text-center">
			<ion-card-header>
				<br />
				<ion-row class="ion-justify-content-center">
					<ion-avatar>
						<img src="lnu_logo.jpg">
					</ion-avatar>
				</ion-row>
				<br />
				<ion-card-subtitle>Created by: <b>Filip Loja</b></ion-card-subtitle>
				<ion-card-title>Smart Waste Management System</ion-card-title>
			</ion-card-header>

			<ion-card-content>
				This application was developed as a part of the final assignment in Internet Architectures course at Linnaeus University in 2021.
			</ion-card-content>
			<br />
		</ion-card>

	</ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, modalController, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonAvatar, IonRow } from '@ionic/vue'
import { defineComponent } from 'vue'
import { closeOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'Modal',
	components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonAvatar, IonRow },
	setup () {

		const closeModal = async () => {
			await modalController.dismiss()
		}

		return {
			closeOutline,
			closeModal
		}
	}
})
</script>
