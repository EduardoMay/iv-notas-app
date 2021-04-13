<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Favoritos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list v-if="favorites.length > 0">
        <ion-item-sliding v-for="favorite in favorites" :key="favorite._id">
          <ion-item
            @click="
              () => {
                router.push(`/notes/view/${favorite._id}`);
              }
            "
          >
            <ion-label>{{ favorite.title }}</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option @click="remove(favorite)" color="danger">
              <ion-icon :icon="trash" slot="icon-only" />
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
  IonItem
} from "@ionic/vue";
import { trash } from "ionicons/icons";
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { types } from "@/types/types";
import { Note } from "@/interfaces/Note";

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
    IonItem
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    return {
      trash,
      router,
      store,
      favorites: computed(() => store.getters.getFavorites)
    };
  },
  methods: {
    remove(note: Note): void {
      note.favorite = false;
      this.store.dispatch(types.DELETE_FAVORITE, { note });
    }
  }
});
</script>
