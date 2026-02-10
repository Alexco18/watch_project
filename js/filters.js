function filterByBrand(brand, list){
  return list.filter(w => w.brand === brand);
}

function sortByYearAsc(list){
  return [...list].sort((a,b)=>a.year - b.year);
}

function sortByYearDesc(list){
  return [...list].sort((a,b)=>b.year - a.year);
}

function sortByBrandAZ(list){
  return [...list].sort((a,b)=>a.brand.localeCompare(b.brand));
}

function sortByBrandZA(list){
  return [...list].sort((a,b)=>b.brand.localeCompare(a.brand));
}
