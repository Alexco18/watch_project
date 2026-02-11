async function loadAllBrands() {
  const brandFiles = [
    "/brands/rolex.js",
    "/brands/omega.js",
    "/brands/lip.js"
  ];

  window.WATCHES = [];

  for (const file of brandFiles) {
    await import(file);
  }

  return window.WATCHES;
}

export { loadAllBrands };
