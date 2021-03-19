<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Notas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list v-if="notas.length > 0" ref="listNotes">
        <ion-item-sliding v-for="(note, index) in notas" :key="index">
          <ion-item-options side="start">
            <ion-item-option @click="favorite(note)" color="danger" expandable>
              <ion-icon :icon="heart" slot="icon-only" />
            </ion-item-option>
          </ion-item-options>
          <ion-item :router-link="'/notes/view/' + note.id">
            <ion-label>{{ note.titulo }}</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option
              @click="
                () => {
                  resetSlides();
                  router.push(`/notes/edit/${note.id}`);
                }
              "
            >
              <ion-icon :icon="create" slot="icon-only" />
            </ion-item-option>
          </ion-item-options>
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
import { heart, create } from "ionicons/icons";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

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
    const router = useRouter();
    const listNotes = ref();

    const resetSlides = () => {
      listNotes.value.$el.closeSlidingItems();
    };

    return { heart, router, create, resetSlides, listNotes };
  },
  methods: {
    obtenerNotas(): void {
      const notas: Array<any> = localStorage.notas
        ? JSON.parse(localStorage.notas)
        : [];

      this.notas = [...notas];
    },
    favorite(note: any): void {
      const favoritesNotes: Array<any> = localStorage.favoritesNotes
        ? JSON.parse(localStorage.favoritesNotes)
        : [];

      const obj = favoritesNotes.find((favorite) => favorite.id === note.id);

      if (obj) {
        this.openToast("Ya esta en tu favoritos");
      } else {
        favoritesNotes.push(note);

        localStorage.setItem("favoritesNotes", JSON.stringify(favoritesNotes));

        this.openToast("Se agrego a favoritos");
      }

      this.resetSlides();
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
