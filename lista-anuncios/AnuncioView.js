export function buildAnuncioView(anuncio) {
  const anuncioDetailView = buildAnuncioDetailView(anuncio);
  let anuncioTemplate = `
    <a href="/detalle-anuncio.html?id=${anuncio.id}">
      ${anuncioDetailView}
    </a>
  `;
  return anuncioTemplate;
}

export function buildAnuncioDetailView(anuncio) {

  let anuncioTemplate = `
    <h1>Nombre del producto: ${anuncio.nombre}</h1>
    <p>Precio: ${anuncio.precio}</p>
    <p>Descripción: ${anuncio.descripcion}</p>
    <img src="${anuncio.foto}"></img> 
    `;

  return anuncioTemplate;
}

export function buildListaAnunciosSpinnerView() {
  return `<div class="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`;
}

export function buildNotFoundAnuncioView() {
  return `
    <h1>Ooops!!! no hay ningún anuncio!!! =(</h1>
  `;
}
