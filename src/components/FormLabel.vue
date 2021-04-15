<template>
  <form @submit.prevent="saveLabel">
    <ion-grid>
      <ion-row class="ion-align-items-center ion-justify-content-between">
        <ion-col size="7" size-md="9">
          <ion-item>
            <ion-input
              v-model="label.description"
              placeholder="Titulo..."
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
        <ion-col
          size="3"
          size-md="2"
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
            v-if="selected"
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
import { Label } from "@/interfaces/Label";
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
      color: computed(() => store.state.LabelsModule.colorLabel || ""),
      label: computed(() =>
        store.getters.getLabelById(store.state.LabelsModule.labelSelected)
      ),
      selected: computed(() => store.state.LabelsModule.labelSelected !== "")
    };
  },
  methods: {
    saveLabel(event: any): void {
      if (this.label.description !== "") {
        const label: Label = {
          ...this.label,
          color: this.color
        };

        if (this.store.state.LabelsModule.labelSelected !== "") {
          this.store.commit(types.UPDATE_LABEL, { label });
        } else {
          this.store.commit(types.ADD_LABEL, { label });

          event.target.reset();
        }

        this.resetForm();
      }
    },
    async openPopover(ev: Event): Promise<void> {
      const popover = await popoverController.create({
        component: LabelsPopover,
        cssClass: "my-custom-class",
        event: ev,
        translucent: true
      });

      return popover.present();
    },
    resetForm(): void {
      this.store.state.LabelsModule.labelSelected = "";
      this.label.name = "";
      this.store.commit(types.SET_COLOR_LABEL, { color: "#92949c" });
    }
  }
});
</script>
