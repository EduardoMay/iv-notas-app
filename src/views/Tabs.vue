<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar>
        <ion-tab-button tab="list" href="/notes/list">
          <ion-icon :icon="home" />
          <ion-label>Inicio</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favorites" href="/favorites/list">
          <ion-icon :icon="heart" />
          <ion-label>Favoritos</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="labels" href="/labels/list">
          <ion-icon :icon="bookmark" />
          <ion-label>Etiquetas</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="add" href="/notes/add">
          <ion-icon :icon="create" />
          <ion-label>Nuevo</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage
} from "@ionic/vue";
import { home, heart, create, bookmark } from "ionicons/icons";

export default {
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      heart,
      home,
      create,
      bookmark
    };
  }
};
</script>
