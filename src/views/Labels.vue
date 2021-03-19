<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Etiquetas</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/notes/list"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <form-label />
      <list-labels />
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
  IonButtons,
  IonBackButton
} from "@ionic/vue";
import { defineComponent } from "vue";
import { addCircle } from "ionicons/icons";
import FormLabel from "@/components/FormLabel.vue";
import ListLabels from "@/components/ListLabels.vue";

export default defineComponent({
  name: "Labels",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButtons,
    IonBackButton,
    FormLabel,
    ListLabels
  },
  setup() {
    return { addCircle };
  }
});
</script>
