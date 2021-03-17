<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Favoritos</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/notes/list"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list v-if="notes.length > 0">
        <ion-item-sliding v-for="(note, index) in notes" :key="index">
          <ion-item
            @click="
              () => {
                router.push(`/notes/view/${note.id}`);
              }
            "
          >
            <ion-label>{{ note.titulo }}</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option @click="remove(note)" color="danger">
              <ion-icon :icon="trash" />
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
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonLabel,
  IonItem,
  IonButtons,
  IonBackButton
} from "@ionic/vue";
import { trash } from "ionicons/icons";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FavoritesNotes",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonLabel,
    IonItem,
    IonButtons,
    IonBackButton
  },
  setup() {
    const router = useRouter();

    return {
      trash,
      router
    };
  },
  data() {
    return {
      notes: [{ id: "" }]
    };
  },
  methods: {
    getFavorites(): void {
      const favorites = localStorage.favoritesNotes
        ? JSON.parse(localStorage.favoritesNotes)
        : [];
      this.notes = favorites;
    },
    remove(note: any): void {
      const favorites: Array<any> = this.notes.filter((n) => n.id !== note.id);

      localStorage.setItem("favoritesNotes", JSON.stringify(favorites));

      this.notes = favorites;
    }
  },
  created() {
    this.getFavorites();
  },
  ionViewDidEnter() {
    this.getFavorites();
  }
});
</script>
