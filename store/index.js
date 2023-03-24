import { createStore } from "vuex";
import * as modulesFiles from "./modules";
let modules = {};

for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, "$2");
  modules[moduleName] = modulesFiles[path];
}
export default createStore({ modules });
