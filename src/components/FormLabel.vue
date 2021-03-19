<template>
  <form @submit.prevent="saveLabel()">
    <ion-grid>
      <ion-row class="ion-align-items-center">
        <ion-col size="1">
          <ion-icon :icon="bookmark" :style="{ color: color }"></ion-icon>
        </ion-col>
        <ion-col size="7">
          <ion-item>
            <ion-input v-model="labelName" placeholder="Nombre..."></ion-input>
          </ion-item>
        </ion-col>
        <ion-col size="2">
          <ion-item>
            <ion-input type="color" v-model="color"></ion-input>
          </ion-item>
        </ion-col>
        <ion-col size="2">
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
import { defineComponent } from "vue";
import { LabelInterface } from "@/interfaces/LabelInterface";

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
      color: "#00ff00",
      labelName: ""
    };
  },
  setup() {
    const store = useStore();

    return { checkmark, bookmark, store };
  },
  methods: {
    saveLabel(): void {
      if (this.labelName !== "") {
        const label: LabelInterface = {
          name: this.labelName,
          color: this.color
        };

        this.store.dispatch("addLabel", { label });

        this.labelName = "";
      }
    }
  }
});
</script>
