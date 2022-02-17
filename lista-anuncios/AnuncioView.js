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

  let venta = ""
  let foto = ""

  if (anuncio.venta) {
    venta = "En venta"
  } else {
    venta = "Se busca"
  }

  if (anuncio.foto) {
    foto = anuncio.foto
  } else {
    foto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&usqp=CAU"
  }


  let anuncioTemplate = `
    <div class="anuncio">
    <h3>${anuncio.nombre}</h3>
    <li>Precio: ${anuncio.precio} €</li>
    <li>Estado: ${venta}</li>
    <li>Descripción: ${anuncio.descripcion}</li>
    <li><img src="${foto}"></img></li>
    </div>
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
