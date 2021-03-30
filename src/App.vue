<template>
	<ion-app>
		<ion-menu side="start" content-id="main-content">
			<ion-header>
				<ion-toolbar translucent>
					<ion-title>Menu</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-content>
				<ion-item>
					<ion-label>Etiquetas ({{ labels.length }})</ion-label>
				</ion-item>
				<ion-list>
					<ion-item
						v-for="label in labels"
						:key="label.id"
						button
						:router-link="'/labels/label/' + label.id"
						@click="openEnd()"
					>
						<ion-icon
							:icon="bookmark"
							slot="start"
							:style="{ color: label.color }"
						></ion-icon>
						<ion-label>{{ label.name }} ({{ label.count }})</ion-label>
					</ion-item>
				</ion-list>
			</ion-content>
		</ion-menu>
		<div class="ion-page" id="main-content">
			<ion-router-outlet />
		</div>
	</ion-app>
</template>

<script lang="ts">
import {
	IonApp,
	IonRouterOutlet,
	menuController,
	IonMenu,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonItem,
	IonIcon,
	IonLabel
} from "@ionic/vue";
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import { bookmark } from "ionicons/icons";

export default defineComponent({
	name: "App",
	components: {
		IonApp,
		IonRouterOutlet,
		IonMenu,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonList,
		IonItem,
		IonIcon,
		IonLabel
	},
	setup() {
		console.log(process.env.VUE_APP_TESTING_1);
		console.log(process.env.VUE_APP_TESTING_2);
		console.log(process.env.VUE_APP_TESTING_3);
		console.log(process.env);
		const store = useStore();

		return {
			labels: computed(() => store.getters.getNotesByIdLabel),
			bookmark
		};
	},
	methods: {
		openEnd() {
			menuController.close("start");
		}
	}
});
</script>
