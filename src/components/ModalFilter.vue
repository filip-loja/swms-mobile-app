<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>Filter Bins</ion-title>
			<ion-buttons slot="end">
				<ion-button expand="block" @click="closeModal">
					<ion-icon slot="icon-only" :icon="closeOutline" />
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">

		<ion-list>
			<ion-item v-for="type in garbageTypes" :key="type" @click="toggleFilter(type)" class="filter-item ion-activatable ripple-parent">
				<ion-avatar class="filter-avatar">
					<img :src="garbageTypeDefs[type]">
				</ion-avatar>
				<ion-label>
					{{ capitalize(type) }}
				</ion-label>
				<ion-toggle :checked="filteredGarbageTypes.includes(type)" :class="`toggle-${type}`" />
				<ion-ripple-effect type="unbounded" />
			</ion-item>
		</ion-list>

		<br />
		<ion-button expand="block" @click="toggleFilter(null)" class="tall-btn">
			Clear all
		</ion-button>

	</ion-content>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, modalController, IonAvatar, IonList, IonItem, IonLabel, IonToggle, IonRippleEffect } from '@ionic/vue'
import { defineComponent, computed } from 'vue'
import { closeOutline } from 'ionicons/icons'
import { useStore } from '@/store'
import { GarbageTypeDef, TypeGarbage } from '@/store/store'

export default defineComponent({
	name: 'ModalFilter',
	components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonAvatar, IonList, IonItem, IonLabel, IonToggle, IonRippleEffect },
	setup () {
		const store = useStore()

		const garbageTypeDefs = computed<GarbageTypeDef>(() => store.state.garbageTypeDefs)
		const garbageTypes = computed<TypeGarbage[]>(() => store.getters['garbageTypes'])
		const filteredGarbageTypes = computed<TypeGarbage[]>(() => store.state.filteredGarbageTypes)

		const closeModal = async () => {
			await modalController.dismiss()
		}

		const toggleFilter = (type: TypeGarbage) => {
			store.commit('SET_FILTER', type)
		}

		const capitalize = (str: string): string => {
			const first = str.charAt(0).toUpperCase()
			return first + str.slice(1)
		}

		return {
			toggleFilter,
			capitalize,
			closeOutline,
			closeModal,
			garbageTypeDefs,
			garbageTypes,
			filteredGarbageTypes
		}
	}
})
</script>

<style scoped>

	.filter-item {
		margin-right: -12px;
		margin-left: -16px;
	}

	.filter-item::part(native) {
		padding-left: 12px;
	}

	.filter-avatar {
		margin-left: 10px;
		margin-right: 10px;
	}

	.toggle-plastic { --handle-background-checked: #FECA18; --background-checked: #FECA1870; }
	.toggle-paper { --handle-background-checked: #13A8E1; --background-checked: #13A8E170; }
	.toggle-glass { --handle-background-checked: #75B73B; --background-checked: #75B73B70; }
	.toggle-metal { --handle-background-checked: #E61C29; --background-checked: #E61C2970; }
	.toggle-mixed { --handle-background-checked: #4E4C4A; --background-checked: #4E4C4A70; }

</style>
