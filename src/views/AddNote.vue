<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Agregar nueva nota</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/notes/list"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <note-form />
    </ion-content>
  </ion-page>
</template>

<script>
import NoteForm from "@/components/NoteForm.vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton
} from "@ionic/vue";

export default {
  name: "AddNote",
  components: {
    NoteForm,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton
  },
  setup() {
    return {};
  }
};
</script>
