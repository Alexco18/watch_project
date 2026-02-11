function displayWatches(list){
  const grid = document.getElementById("watch-grid");
  grid.innerHTML = "";

  list.forEach(w => {
    grid.innerHTML += `
      <div class="watch-card" onclick="location.href='watch.html?id=${w.id}'">
        <img src="${w.img}">
        <p><strong>${w.brand}</strong> ${w.name} (${w.year})</p>
      </div>
    `;
  });
}

function populateBrandFilter(list){
  const select = document.getElementById("brand-filter");
  const brands = [...new Set(list.map(w => w.brand))].sort();

  brands.forEach(b => {
    select.innerHTML += `<option value="${b}">${b}</option>`;
  });
}
