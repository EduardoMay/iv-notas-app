import { createStore } from "vuex";
import { NotesModule } from "./modules/notes";
import { LabelsModule } from "./modules/labels";
import { FavoritesModule } from "./modules/favorites";

export const store = createStore({
  modules: {
    NotesModule,
    LabelsModule,
    FavoritesModule
  }
});
