<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <ion-button color="light" @click="setColorLabel('#92949c')">
          <ion-icon :icon="bookmark" style="color: #92949c"></ion-icon>
        </ion-button>
      </ion-col>
      <ion-col>
        <ion-button color="light" @click="setColorLabel('#3dc2ff')">
          <ion-icon :icon="bookmark" style="color: #3dc2ff"></ion-icon>
        </ion-button>
      </ion-col>
      <ion-col>
        <ion-button color="light" @click="setColorLabel('#5260ff')">
          <ion-icon :icon="bookmark" style="color: #5260ff"></ion-icon>
        </ion-button>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-button color="light" @click="setColorLabel('#2dd36f')">
          <ion-icon :icon="bookmark" style="color: #2dd36f"></ion-icon>
        </ion-button>
      </ion-col>
      <ion-col>
        <ion-button color="light" @click="setColorLabel('#ffc409')">
          <ion-icon :icon="bookmark" style="color: #ffc409"></ion-icon>
        </ion-button>
      </ion-col>
      <ion-col>
        <ion-button color="light" @click="setColorLabel('#eb445a')">
          <ion-icon :icon="bookmark" style="color: #eb445a"></ion-icon>
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonIcon, IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue";
import { bookmark } from "ionicons/icons";
import { useStore } from "vuex";
import { defineComponent } from "vue";
import { types } from "@/types/types";

export default defineComponent({
  name: "LabelsPopover",
  components: { IonIcon, IonGrid, IonRow, IonCol, IonButton },
  setup() {
    const store = useStore();

    return { bookmark, store };
  },
  methods: {
    setColorLabel(color: string): void {
      this.store.commit(types.SET_COLOR_LABEL, { color });
    }
  }
});
</script>
