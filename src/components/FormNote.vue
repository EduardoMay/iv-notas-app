<template>
  <form @submit.prevent="saveNote()" class="ion-padding">
    <ion-item class="ion-margin-top">
      <ion-label position="floating">Titulo</ion-label>
      <ion-input v-model="title"></ion-input>
    </ion-item>

    <ion-item class="ion-margin-top">
      <ion-label position="floating">Descripción</ion-label>
      <ion-textarea rows="10" v-model="description"></ion-textarea>
    </ion-item>

    <ion-item class="ion-margin-top" v-if="labels.length > 0">
      <ion-label>Etiqueta</ion-label>
      <ion-select
        :value="label"
        interface="action-sheet"
        cancel-text="Salir"
        v-model="label"
      >
        <ion-select-option
          v-for="label in labels"
          :key="label.id"
          :value="label.id"
        >
          <span :style="{ color: label.color }">{{ label.name }}</span>
        </ion-select-option>
      </ion-select>
    </ion-item>

    <ion-button class="ion-margin-top" expand="full" type="submit">
      Guardar
    </ion-button>

    <ion-button
      class="ion-margin-top"
      color="default"
      expand="full"
      type="button"
      router-link="/notes/list"
    >
      Cancelar
    </ion-button>
  </form>
</template>

<script lang="ts">
import {
  IonItem,
  IonLabel,
  IonTextarea,
  IonButton,
  toastController,
  IonInput,
  IonSelect,
  IonSelectOption
} from "@ionic/vue";
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NoteInterface } from "@/interfaces/NoteInterface";
import { types } from "@/types/types";
import { getNote } from "@/helpers/notes";
import { bookmark } from "ionicons/icons";

export default defineComponent({
  name: "FormNote",
  components: {
    IonItem,
    IonLabel,
    IonTextarea,
    IonButton,
    IonInput,
    IonSelect,
    IonSelectOption
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let { id } = route?.params;
    let title = "";
    let description = "";
    let label = 0;

    if (!id) {
      id = "";
    } else {
      const note = getNote(Number(id));

      title = note?.title || "";
      description = note?.description || "";
      label = Number(note?.label) || 0;
    }

    return {
      router,
      id,
      title,
      description,
      label,
      store,
      labels: computed(() => store.state.notesLabels),
      bookmark
    };
  },
  methods: {
    saveNote(): void {
      if (this.title !== "") {
        const note: NoteInterface = {
          id: this.id === "" ? new Date().getTime() : Number(this.id),
          title: this.title,
          description: this.description,
          label: Number(this.label)
        };

        if (this.id !== "") {
          this.store.dispatch(types.UPDATE_NOTE, { note });
          this.router.replace(`/notes/view/${this.id}`);
        } else {
          this.store.dispatch(types.ADD_NOTE, { note });
          this.router.replace("/notes/list");
        }

        this.title = "";
        this.description = "";

        this.openToast("Se ha guardado correctamente.");
      } else {
        this.openToast("Agrega un titulo");
      }
    },

    async openToast(title: string): Promise<any> {
      const toast = await toastController.create({
        header: "Nota",
        message: title,
        duration: 2000
      });
      return toast.present();
    }
  }
});
</script>
