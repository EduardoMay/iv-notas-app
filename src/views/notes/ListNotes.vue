<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Notas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list v-if="notes.length > 0" ref="listNotes">
        <ion-item-sliding v-for="(note, index) in notes" :key="index">
          <ion-item-options side="start">
            <ion-item-option @click="favorite(note)" color="danger" expandable>
              <ion-icon :icon="heart" slot="icon-only" />
            </ion-item-option>
          </ion-item-options>
          <ion-item :router-link="'/notes/view/' + note._id">
            <ion-label>{{ note.title }}</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option @click="deleteNote(note._id)" color="danger">
              <ion-icon :icon="trash" slot="icon-only" />
            </ion-item-option>
            <ion-item-option
              @click="
                () => {
                  resetSlides();
                  router.replace(`/notes/edit/${note._id}`);
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
import { heart, create, trash } from "ionicons/icons";
import { useStore } from "vuex";
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { types } from "@/types/types";
import { getFavorites } from "@/helpers/favorites";
import { Note } from "@/interfaces/Note";

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
  setup() {
    const store = useStore();
    const router = useRouter();
    const listNotes = ref();

    const resetSlides = () => {
      listNotes.value.$el.closeSlidingItems();
    };

    return {
      heart,
      router,
      trash,
      create,
      resetSlides,
      listNotes,
      store,
      notes: computed(() => store.state.NotesModule.notes)
    };
  },
  methods: {
    favorite(note: Note): void {
      const favorite = getFavorites().find(
        (favorite) => favorite._id === note._id
      );

      if (favorite) {
        this.openToast("Ya esta en tu favoritos");
      } else {
        this.store.dispatch(types.ADD_FAVORITE, { note });

        this.openToast("Se agrego a favoritos");
      }

      this.resetSlides();
    },
    async deleteNote(id: string): Promise<void> {
      await this.store.dispatch(types.DELETE_NOTE, { id });
    },
    async openToast(message: string) {
      const toast = await toastController.create({
        header: "Favoritos",
        message,
        duration: 2000
      });

      return toast.present();
    }
  }
});
</script>
