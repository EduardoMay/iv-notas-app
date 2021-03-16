<template>
  <ion-page>
    <ion-content>
      <form @submit.prevent="guardarNota()">
        <ion-item>
          <ion-label position="floating">Titulo</ion-label>
          <ion-input v-model="titulo"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Floating Label</ion-label>
          <ion-textarea rows="10" v-model="nota"></ion-textarea>
        </ion-item>
        <ion-button expand="block" type="submit">
          Block Button
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonItem,
  IonLabel,
  IonTextarea,
  IonContent,
  IonButton,
  toastController,
  IonPage,
  IonInput
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NoteForm",
  components: {
    IonItem,
    IonLabel,
    IonTextarea,
    IonContent,
    IonButton,
    IonPage,
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
    return { router };
  },
  methods: {
    guardarNota() {
      if (this.titulo !== "" && this.nota !== "") {
        const nota: Array<any> = [{ titulo: this.titulo, nota: this.nota }];
        let notas: Array<any> = localStorage.notas
          ? JSON.parse(localStorage.notas)
          : [];

        if (notas.length > 0) {
          notas = [...notas, ...nota];

          localStorage.setItem("notas", JSON.stringify(notas));

          this.titulo = "";
          this.nota = "";
        } else {
          localStorage.setItem("notas", JSON.stringify(nota));
        }

        this.router.push("/notes/list");
        this.openToast();
      } else {
        console.log("Titulo y nota están vacíos");
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
  }
});
</script>
