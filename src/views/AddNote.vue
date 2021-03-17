<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Agregar nueva nota</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Add note</ion-title>
        </ion-toolbar>
      </ion-header>
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
  IonContent
} from "@ionic/vue";

export default {
  name: "AddNote",
  components: {
    NoteForm,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  },
  setup() {
    return {};
  }
};
</script>
