<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{label.name}}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/notes/list"></ion-back-button>
        </ion-buttons>
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
          <ion-item :router-link="'/notes/view/' + note.id">
            <ion-label>{{ note.titulo }}</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option @click="deleteNote(note.id)" color="danger">
              <ion-icon :icon="trash" slot="icon-only" />
            </ion-item-option>
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
import {computed, defineComponent, ref} from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItem,
  IonLabel,
  IonIcon,
  toastController
} from "@ionic/vue";
import { useRoute } from "vue-router";
import { getLabelById, selectNotesByIdLabel } from "@/helpers/labels";
import { NoteInterface } from "@/interfaces/NoteInterface";
import { getFavorites } from "@/helpers/favorites";
import { useStore } from "vuex";
import { types } from "@/types/types";
import { heart, create, trash } from "ionicons/icons";

export default defineComponent({
  name: "ListLabels",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonItem,
    IonLabel,
    IonIcon
  },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const listNotes = ref();
    const store = useStore();

    const resetSlides = () => {
      listNotes.value.$el.closeSlidingItems();
    };

    return {
      id,
      notes: selectNotesByIdLabel(Number(id)),
      resetSlides,
      store,
      heart,
      create,
      trash,
      label: computed(() => getLabelById(Number(id)))
    };
  },
  methods: {
    favorite(note: NoteInterface): void {
      const favorite = getFavorites().find(
        (favorite) => favorite.id === note.id
      );

      if (favorite) {
        this.openToast("Ya esta en tu favoritos");
      } else {
        this.store.dispatch(types.ADD_FAVORITE, { favorite: note });

        this.openToast("Se agrego a favoritos");
      }

      this.resetSlides();
    },
    deleteNote(id: number) {
      this.store.dispatch(types.DELETE_NOTE, { id });
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
