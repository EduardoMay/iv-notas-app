<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="openMenu()">
            <ion-icon :icon="menu" slot="icon-only" />
          </ion-button>
        </ion-buttons>
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
            <ion-label>
              {{ note.title }}
            </ion-label>
            <ion-chip
              slot="end"
              outline
              color="primary"
              :style="{ borderColor: note.label.color }"
              v-if="note.label"
            >
              <ion-label :style="{ color: note.label.color }">
                {{ note.label.description }}
              </ion-label>
            </ion-chip>
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
  IonButtons,
  IonButton,
  IonChip,
  toastController,
  IonIcon,
  menuController
} from "@ionic/vue";
import { heart, create, trash, menu } from "ionicons/icons";
import { useStore } from "vuex";
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { types } from "@/types/types";
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
    IonButtons,
    IonButton,
    IonChip,
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
      menu,
      create,
      resetSlides,
      listNotes,
      store,
      notes: computed(() => store.state.NotesModule.notes)
    };
  },
  methods: {
    favorite(note: Note): void {
      if (note.favorite) {
        this.openToast("Ya esta en tu favoritos");
      } else {
        note.favorite = true;
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
    },
    openMenu() {
      menuController.open("menu");
    }
  }
});
</script>
