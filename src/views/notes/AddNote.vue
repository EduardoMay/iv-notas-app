<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title v-if="id === undefined">Agregar nueva nota</ion-title>
        <ion-title v-else>Editar nota</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <form-note/>
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
} from "@ionic/vue";
import {useRoute} from "vue-router";
import FormNote from "@/components/FormNote.vue";

export default {
  name: "AddNote",
  components: {
    FormNote,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },
  setup() {
    const route = useRoute();
    const { id } = route?.params;

    return {
      id
    };
  }
};
</script>
