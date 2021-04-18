<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/notes/list"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="deleteNote(String(id))" color="danger">
            <ion-icon :icon="trash" slot="icon-only" />
          </ion-button>
          <ion-button :router-link="'/notes/edit/' + id" color="primary">
            <ion-icon :icon="create" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="false">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">{{ description }}</div>
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
  IonButtons,
  IonButton,
  IonBackButton,
  IonIcon
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { create, trash } from "ionicons/icons";
import { useStore } from "vuex";
import { types } from "@/types/types";

export default defineComponent({
  name: "ViewNote",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon
  },
  data() {
    return {
      title: "",
      description: ""
    };
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const { id } = route.params;

    return { id, create, trash, store };
  },
  methods: {
    async getNote(): Promise<void> {
      const note = await this.$store.getters.getNoteBydId(this.id);

      this.title = note ? note?.title : "";
      this.description = note ? note?.description : "";
    },
    async deleteNote(id: string): Promise<void> {
      await this.store.dispatch(types.DELETE_NOTE, { id });
    }
  },
  created() {
    this.getNote();
  },
  ionViewDidEnter() {
    this.getNote();
  }
});
</script>
<style scope>
#container {
  width: 90%;
  margin: auto;
  margin-top: 1rem;
}
</style>
