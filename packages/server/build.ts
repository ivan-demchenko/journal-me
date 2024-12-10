async function main() {
  await Bun.build({
    entrypoints: ["./index.ts"],
    outdir: "./dist",
    target: "bun",
  });
}

main().then(() => console.log("Done!"));
