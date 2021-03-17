<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ titulo }}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/notes/list"></ion-back-button>
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
  IonBackButton
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewNote",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton
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

    return { id };
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
