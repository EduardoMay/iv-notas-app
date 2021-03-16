<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"></ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item v-for="(nota, index) in notas" :key="index">
          <ion-label>{{ nota.titulo }}</ion-label>
        </ion-item>
      </ion-list>
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
  IonList,
  IonItem,
  IonLabel
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Tab1",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel
  },
  data() {
    return {
      notas: [{ titulo: "", nota: "" }]
    };
  },
  methods: {
    obtenerNotas(): void {
      const notas: Array<any> = localStorage.notas
        ? JSON.parse(localStorage.notas)
        : [];
      console.log(notas);

      this.notas = [...notas];
    }
  },
  created() {
    this.obtenerNotas();
  },
  ionViewDidEnter() {
    this.obtenerNotas();
  }
});
</script>
