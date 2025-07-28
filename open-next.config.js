// open-next.config.js
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  /*  
     No necesitamos nada especial porque los estáticos
     ya los sirve la sección [assets] del wrangler.toml.
  */
});
