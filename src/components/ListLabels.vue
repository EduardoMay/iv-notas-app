<template>
  <ion-list v-for="(label, index) in labels" :key="index">
    <ion-item>
      <ion-label>
        <ion-icon :icon="bookmark" :style="{ color: label.color }"></ion-icon>
        {{ label.name }}
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonList, IonItem, IonLabel, IonIcon } from "@ionic/vue";
import { bookmark } from "ionicons/icons";

export default defineComponent({
  name: "ListLabels",
  components: { IonList, IonItem, IonLabel, IonIcon },
  emits: ["update:labels"],
  props: { allLabels: Array },
  data() {
    return {
      labels: []
    };
  },
  setup() {
    return { bookmark };
  },
  methods: {
    getLabels() {
      const labels = localStorage.notesLabels
        ? JSON.parse(localStorage.notesLabels)
        : [];

      this.labels = labels;
      this.$emit("update:labels", this.labels);
    }
  },
  created() {
    this.getLabels();
  },
  ionViewDidEnter() {
    this.getLabels();
  }
});
</script>
