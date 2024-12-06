async function main () {
  await Bun.build({
    entrypoints: ['./server/index.ts'],
    outdir: './dist/server',
    target: 'bun',
  });
}

main().then(() => console.log('Done!'));
