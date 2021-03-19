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
    const store = useStore();

    return {
      color: "#00ff00",
      labelName: "",
      store
    };
  },
  setup() {
    return { checkmark, bookmark };
  },
  methods: {
    saveLabel(): void {
      const label = { name: this.labelName, color: this.color };
      const notesLabels: Array<any> = localStorage.notesLabels
        ? JSON.parse(localStorage.notesLabels)
        : [];
      notesLabels.push(label);

      if (label.name !== "") {
        localStorage.setItem("notesLabels", JSON.stringify(notesLabels));
        this.store.dispatch("addLabel", { label: label });
        this.labelName = "";
      }
    }
  }
});
</script>
