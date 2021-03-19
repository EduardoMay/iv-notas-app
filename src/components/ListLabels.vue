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
import { computed, defineComponent } from "vue";
import { IonList, IonItem, IonLabel, IonIcon } from "@ionic/vue";
import { bookmark } from "ionicons/icons";
import { useStore } from "vuex";

export default defineComponent({
  name: "ListLabels",
  components: { IonList, IonItem, IonLabel, IonIcon },
  data() {
    return {
      labels: []
    };
  },
  setup() {
    const store = useStore();

    return { bookmark, value: computed(() => store.state.notesLabels) };
  },
  methods: {
    getLabels() {
      const labels = localStorage.notesLabels
        ? JSON.parse(localStorage.notesLabels)
        : [];

      this.labels = labels;
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
