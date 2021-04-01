import { createStore } from "vuex";
import notes from "./modules/notes";
import labels from "./modules/labels";
import favorites from "./modules/favorites";

export const store = createStore({
	modules: {
		notes,
		labels,
		favorites
	}
});
