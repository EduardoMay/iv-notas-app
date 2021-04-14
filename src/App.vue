<template>
  <ion-app>
    <ion-menu side="start" content-id="main-content">
      <ion-header>
        <ion-toolbar translucent>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-item>
          <ion-label>Etiquetas ({{ labels.length }})</ion-label>
        </ion-item>
        <ion-list>
          <ion-item
            v-for="label in labels"
            :key="label._id"
            button
            :router-link="'/labels/label/' + label._id"
            @click="openEnd()"
          >
            <ion-icon
              :icon="bookmark"
              slot="start"
              :style="{ color: label.color }"
            ></ion-icon>
            <ion-label>
              {{ label.description }} ({{ label.notes.length }})
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <div class="ion-page" id="main-content">
      <ion-router-outlet />
    </div>
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonRouterOutlet,
  menuController,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel
} from "@ionic/vue";
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import { bookmark } from "ionicons/icons";
import { types } from "./types/types";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel
  },
  setup() {
    const store = useStore();

    store.commit(types.GET_LABELS);
    store.commit(types.GET_NOTES);

    console.log(store.state.LabelsModule.labels);

    return {
      labels: computed(() => store.state.LabelsModule.labels),
      bookmark
    };
  },
  methods: {
    openEnd() {
      menuController.close("start");
    }
  }
});
</script>
