<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar>
        <ion-tab-button tab="list" href="/notes/list">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favorites" href="/notes/favorites">
          <ion-icon :icon="heart" />
          <ion-label>Favoritos</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="categories" href="/notes/categories">
          <ion-icon :icon="square" />
          <ion-label>Categorías</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="add" href="/notes/add">
          <ion-icon :icon="create" />
          <ion-label>Add</ion-label>
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
import { square, home, heart, create } from "ionicons/icons";

export default {
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      heart,
      square,
      home,
      create
    };
  }
};
</script>
