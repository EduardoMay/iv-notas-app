<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Favoritos</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-list v-if="favorites.length > 0">
				<ion-item-sliding v-for="(favorite, index) in favorites" :key="index">
					<ion-item
						@click="
							() => {
								router.push(`/notes/view/${favorite.id}`);
							}
						"
					>
						<ion-label>{{ favorite.title }}</ion-label>
					</ion-item>
					<ion-item-options side="end">
						<ion-item-option @click="remove(favorite.id)" color="danger">
							<ion-icon :icon="trash" slot="icon-only" />
						</ion-item-option>
					</ion-item-options>
				</ion-item-sliding>
			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
	IonIcon,
	IonLabel,
	IonItem
} from "@ionic/vue";
import { trash } from "ionicons/icons";
import { mapState, useStore } from "vuex";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { types } from "@/types/types";

export default defineComponent({
	name: "FavoritesNotes",
	components: {
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonPage,
		IonList,
		IonItemSliding,
		IonItemOptions,
		IonItemOption,
		IonIcon,
		IonLabel,
		IonItem
	},
	setup() {
		const store = useStore();
		const router = useRouter();

		return {
			trash,
			router,
			store
		};
	},
	methods: {
		remove(id: number): void {
			this.store.dispatch(`favorites/${types.DELETE_FAVORITE}`, { id });
		}
	},
	computed: {
		...mapState({
			favorites: (state: any) => state.favorites.favorites
		})
	}
});
</script>
