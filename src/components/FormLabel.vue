<template>
  <form @submit.prevent="saveLabel()">
    <ion-grid>
      <ion-row class="ion-align-items-center ion-justify-content-between">
        <ion-col size="8" size-md="10">
          <ion-item>
            <ion-input v-model="labelName" placeholder="Nombre..."></ion-input>
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
  popoverController,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/vue";
import { checkmark, bookmark } from "ionicons/icons";
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
  data() {
    return {
      labelName: ""
    };
  },
  setup() {
    const store = useStore();

    return {
      checkmark,
      bookmark,
      store,
      color: computed(() => store.state.colorLabel)
    };
  },
  methods: {
    saveLabel(): void {
      if (this.labelName !== "") {
        const label: LabelInterface = {
          id: new Date().getTime(),
          name: this.labelName,
          color: this.color
        };

        this.store.dispatch("addLabel", { label });

        this.labelName = "";
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
