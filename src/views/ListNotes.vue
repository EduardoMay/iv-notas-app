<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Notas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"></ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list v-if="notas.length > 0">
        <ion-item-sliding v-for="(note, index) in notas" :key="index">
          <ion-item-options side="start">
            <ion-item-option @click="favorite(note)">
              <ion-icon :icon="heart" />
            </ion-item-option>
          </ion-item-options>
          <ion-item>
            <ion-label>{{ note.titulo }}</ion-label>
          </ion-item>
        </ion-item-sliding>
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
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  toastController,
  IonIcon
} from "@ionic/vue";
import { heart } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListsNotes",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon
  },
  data() {
    return {
      notas: [{ titulo: "", nota: "" }]
    };
  },
  setup() {
    return { heart };
  },
  methods: {
    obtenerNotas(): void {
      const notas: Array<any> = localStorage.notas
        ? JSON.parse(localStorage.notas)
        : [];
      console.log(notas);

      this.notas = [...notas];
    },
    favorite(note: any): void {
      const favoritesNotes: Array<any> = localStorage.favoritesNotes
        ? JSON.parse(localStorage.favoritesNotes)
        : [];

      const obj = favoritesNotes.find((favorite) => favorite.id === note.id);

      if (obj) {
        this.openToast("Ya esta en tu favoritos");
        return;
      }

      favoritesNotes.push(note);

      localStorage.setItem("favoritesNotes", JSON.stringify(favoritesNotes));

      this.openToast("Se agrego a favoritos");
    },
    async openToast(message: string) {
      const toast = await toastController.create({
        header: "Favoritos",
        message,
        duration: 2000
      });
      return toast.present();
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
