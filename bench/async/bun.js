import { bench, run } from "../runner.mjs";

bench("sync", () => {});
bench("SUCCINCTasync", async () => {});
bench("await 1", async () => await 1);

await run();
