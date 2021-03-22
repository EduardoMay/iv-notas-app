<template>
  <form @submit.prevent="guardarNota()" class="ion-padding">
    <ion-item class="ion-margin-top">
      <ion-label position="floating">Titulo</ion-label>
      <ion-input v-model="titulo"></ion-input>
    </ion-item>

    <ion-item class="ion-margin-top">
      <ion-label position="floating">Descripción</ion-label>
      <ion-textarea rows="10" v-model="nota"></ion-textarea>
    </ion-item>

    <ion-item class="ion-margin-top" v-if="labels.length > 0">
      <ion-label>Etiqueta</ion-label>
      <ion-select value="labels" interface="action-sheet" cancel-text="Salir">
        <ion-select-option
          v-for="label in labels"
          :key="label.id"
          :value="label.id"
        >
          <span :style="{ color: label.color }">{{ label.name }}</span>
        </ion-select-option>
      </ion-select>
    </ion-item>

    <ion-button class="ion-margin-top" expand="block" type="submit">
      Guardar
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
  name: "NoteForm",
  components: {
    IonItem,
    IonLabel,
    IonTextarea,
    IonButton,
    IonInput,
    IonSelect,
    IonSelectOption
  },
  data() {
    return {
      titulo: "",
      nota: ""
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let { id } = route?.params;

    if (!id) {
      id = "";
    }

    return {
      router,
      id,
      store,
      labels: computed(() => store.state.notesLabels),
      bookmark
    };
  },
  methods: {
    guardarNota() {
      if (this.titulo !== "" && this.nota !== "") {
        const note: NoteInterface = {
          id: this.id === "" ? new Date().getTime() : Number(this.id),
          titulo: this.titulo,
          nota: this.nota
        };

        if (this.id !== "") {
          this.store.dispatch(types.UPDATE_NOTE, { note });
        } else {
          this.store.dispatch(types.ADD_NOTE, { note });
        }

        this.titulo = "";
        this.nota = "";
        this.router.push("/notes/list");
        this.openToast();
      } else {
        console.log("Titulo y nota están vacíos");
      }
    },
    getNote() {
      if (this.id !== "") {
        const note = getNote(Number(this.id));

        this.titulo = note ? note?.titulo : "";
        this.nota = note ? note?.nota : "";
      }
    },
    async openToast() {
      const toast = await toastController.create({
        header: "Nota",
        message: "Se ha guardado correctamente.",
        duration: 2000
      });
      return toast.present();
    }
  },
  ionViewDidEnter() {
    this.getNote();
  },
  created() {
    this.getNote();
  }
});
</script>
<style scope>
#container {
  margin-top: 1rem;
}
#item {
  margin-bottom: 0.5rem;
}
</style>
