<template>
  <form @submit.prevent="saveLabel()">
    <ion-grid>
      <ion-row class="ion-align-items-center ion-justify-content-between">
        <ion-col size="8" size-md="10">
          <ion-item>
            <ion-input
              v-model="labelName.name"
              placeholder="Nombre..."
            ></ion-input>
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
        <ion-col size="2" size-md="1" class="ion-text-center">
          <ion-button fill="clear" size="default" type="submit">
            <ion-icon slot="icon-only" :icon="checkmark"></ion-icon>
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
import { bookmark, checkmark } from "ionicons/icons";
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import { LabelInterface } from "@/interfaces/LabelInterface";
import LabelsPopover from "./LabelsPopover.vue";
import { types } from "@/types/types";
import { getLabelById } from "@/helpers/labels";

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
      store,
      color: computed(() => store.state.colorLabel),
      labelName: computed(() => {
        return getLabelById(store.state.labelSelected);
      })
    };
  },
  methods: {
    saveLabel(): void {
      if (this.labelName?.name !== "") {
        const label: LabelInterface = {
          id: new Date().getTime(),
          name: this.labelName?.name || "",
          color: this.color
        };

        this.store.dispatch("addLabel", { label });

        this.labelName = { id: 0, name: "", color: "" };
        this.store.commit(types.SET_COLOR_LABEL, { color: "#92949c" });
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
    }
  }
});
</script>
