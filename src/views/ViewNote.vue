<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ titulo }}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/notes/list"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button :router-link="'/notes/edit/' + id">
            <ion-icon :icon="create" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="false">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ titulo }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">{{ nota }}</div>
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
  IonButton,
  IonBackButton,
  IonIcon
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { create } from "ionicons/icons";

export default defineComponent({
  name: "ViewNote",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon
  },
  data() {
    return {
      titulo: "",
      nota: ""
    };
  },
  setup() {
    const route = useRoute();
    const { id } = route.params;

    return { id, create };
  },
  methods: {
    getNote(): void {
      const notes: Array<any> = JSON.parse(localStorage.notas);

      const { titulo, nota } = notes.find(
        (note) => note.id === Number(this.id)
      );

      this.titulo = titulo;
      this.nota = nota;
    }
  },
  created() {
    this.getNote();
  },
  ionViewDidEnter() {
    this.getNote();
  }
});
</script>
<style scope>
#container {
  width: 90%;
  margin: auto;
  margin-top: 1rem;
}
</style>
