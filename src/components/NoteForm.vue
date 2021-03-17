<template>
  <form @submit.prevent="guardarNota()" class="ion-padding">
    <ion-item id="item">
      <ion-label position="floating">Titulo</ion-label>
      <ion-input v-model="titulo"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Descripción</ion-label>
      <ion-textarea rows="10" v-model="nota"></ion-textarea>
    </ion-item>
    <ion-button expand="block" type="submit">
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
  IonInput
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "NoteForm",
  components: {
    IonItem,
    IonLabel,
    IonTextarea,
    IonButton,
    IonInput
  },
  data() {
    return {
      titulo: "",
      nota: ""
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    let { id } = route?.params;

    if (!id) {
      id = "";
    }

    return { router, id };
  },
  methods: {
    guardarNota() {
      if (this.titulo !== "" && this.nota !== "") {
        let notas: Array<any> = localStorage.notas
          ? JSON.parse(localStorage.notas)
          : [];

        if (this.id !== "") {
          notas = notas.map((note) => {
            if (note.id === this.id) {
              note.titulo = this.titulo;
            }

            return note.id === Number(this.id)
              ? { ...note, titulo: this.titulo, nota: this.nota }
              : note;
          });

          localStorage.setItem("notas", JSON.stringify(notas));
        } else {
          const nota: Array<any> = [
            { id: new Date().getTime(), titulo: this.titulo, nota: this.nota }
          ];

          if (notas.length > 0) {
            notas = [...notas, ...nota];

            localStorage.setItem("notas", JSON.stringify(notas));

            this.titulo = "";
            this.nota = "";
          } else {
            localStorage.setItem("notas", JSON.stringify(nota));
          }
        }

        this.router.push("/notes/list");
        this.openToast();
      } else {
        console.log("Titulo y nota están vacíos");
      }
    },
    getNote() {
      if (this.id !== "") {
        const notes: Array<any> = JSON.parse(localStorage.notas);

        const { titulo, nota } = notes.find(
          (note) => note.id === Number(this.id)
        );

        this.titulo = titulo;
        this.nota = nota;
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
