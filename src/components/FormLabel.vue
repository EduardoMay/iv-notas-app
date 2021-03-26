<template>
	<form @submit.prevent="saveLabel()">
		<ion-grid>
			<ion-row class="ion-align-items-center ion-justify-content-between">
				<ion-col size="7" size-md="9">
					<ion-item>
						<ion-input v-model="label.name" placeholder="Titulo..."></ion-input>
					</ion-item>
				</ion-col>
				<ion-col size="2" size-md="1" class="ion-text-center">
					<ion-icon
						button
						:icon="bookmark"
						:style="{ color: color, cursor: 'pointer' }"
						@click="openPopover"
					></ion-icon>
				</ion-col>
				<ion-col
					size="3"
					size-md="1"
					style="display: flex; justify-content:space-around"
				>
					<ion-button fill="clear" size="sm" type="submit">
						<ion-icon slot="icon-only" :icon="checkmark"></ion-icon>
					</ion-button>

					<ion-button
						fill="clear"
						size="sm"
						color="danger"
						@click="resetForm()"
						type="button"
					>
						<ion-icon slot="icon-only" :icon="close"></ion-icon>
					</ion-button>
				</ion-col>
			</ion-row>
		</ion-grid>
	</form>
</template>

<script lang="ts">
import {
	IonButton,
	IonCol,
	IonGrid,
	IonIcon,
	IonInput,
	IonItem,
	IonRow,
	popoverController
} from "@ionic/vue";
import { bookmark, checkmark, close } from "ionicons/icons";
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import { LabelInterface } from "@/interfaces/LabelInterface";
import LabelsPopover from "./LabelsPopover.vue";
import { types } from "@/types/types";

export default defineComponent({
	name: "FormLabel",
	components: {
		IonItem,
		IonInput,
		IonButton,
		IonIcon,
		IonGrid,
		IonRow,
		IonCol
	},
	setup() {
		const store = useStore();

		return {
			checkmark,
			bookmark,
			close,
			store,
			color: computed(() => store.state.colorLabel || ""),
			label: computed(() =>
				store.getters.getLabelById(store.state.labelSelected)
			)
		};
	},
	methods: {
		saveLabel(): void {
			if (this.label.name !== "") {
				const label: LabelInterface = {
					id:
						this.store.state.labelSelected !== 0
							? this.store.state.labelSelected
							: new Date().getTime(),
					name: this.label.name,
					color: this.color
				};

				console.log(label);

				// this.store.dispatch("addLabel", { label });

				// this.label = { id: 0, name: "", color: "" };
				// this.store.commit(types.SET_COLOR_LABEL, { color: "#92949c" });
			}
		},
		async openPopover(ev: Event) {
			const popover = await popoverController.create({
				component: LabelsPopover,
				cssClass: "my-custom-class",
				event: ev,
				translucent: true
			});

			return popover.present();
		},
		resetForm() {
			this.store.state.labelSelected = 0;
			// TODO REVISAR QUE SE LIMPIE EL FORMULARIO CUANDO CLICKED EN EL BOTÓN CANCELAR
			console.log(this.label);
			this.store.commit(types.SET_COLOR_LABEL, { color: "#92949c" });
		}
	}
});
</script>
