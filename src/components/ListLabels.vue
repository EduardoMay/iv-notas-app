<template>
  <ion-list v-if="labels.length > 0" ref="listLabels">
    <ion-item-sliding v-for="label in labels" :key="label.id">
      <ion-item-options side="start">
        <ion-item-option @click="remove(label)" color="danger" expandable>
          <ion-icon :icon="trash" slot="icon-only" />
        </ion-item-option>
      </ion-item-options>
      <ion-item @click="selected(label.id)">
        <ion-label>
          <ion-icon
            slot="icon-only"
            :icon="bookmark"
            :style="{ color: label.color }"
          ></ion-icon>
          {{ label.description }}
        </ion-label>
      </ion-item>
    </ion-item-sliding>
  </ion-list>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from "@ionic/vue";
import { bookmark, trash } from "ionicons/icons";
import { useStore } from "vuex";
import { Label } from "@/interfaces/Label";
import { types } from "@/types/types";

export default defineComponent({
  name: "ListLabels",
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
  },
  setup() {
    const store = useStore();
    const listLabels = ref();

    const resetSlides = () => {
      listLabels.value.$el.closeSlidingItems();
    };

    return {
      bookmark,
      trash,
      store,
      labels: computed(() => store.state.notesLabels),
      resetSlides,
      listLabels
    };
  },
  methods: {
    remove(label: Label) {
      this.store.dispatch("deleteLabel", { label });
      this.resetSlides();
    },
    selected(id: number) {
      this.$store.commit(types.LABEL_SELECTED, { id });
    }
  }
});
</script>
