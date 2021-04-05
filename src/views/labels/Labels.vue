<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Etiquetas</ion-title>
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
  IonContent
} from "@ionic/vue";
import { defineComponent } from "vue";
import FormLabel from "@/components/FormLabel.vue";
import ListLabels from "@/components/ListLabels.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Labels",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    FormLabel,
    ListLabels
  },
  setup() {
    const store = useStore();

    return {
      store
    };
  },
  ionViewDidLeave() {
    this.store.state.labelSelected = 0;
    this.store.state.colorLabel = "#92949c";
  }
});
</script>
