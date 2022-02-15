import { pubSub } from "../shared/pubSub.js";
import AnuncioService from "./AnuncioService.js";
import {
  buildAnuncioView,
  buildListaAnunciosSpinnerView,
  buildNotFoundAnuncioView,
} from "./AnuncioView.js";

export class ListaAnunciosController {
  anuncioListElement = null;

  constructor(anuncioListElement, notificationController) {
    this.anuncioListElement = anuncioListElement;
    this.notificationController = notificationController;
  }

  async mostrarAnuncios() {
    let anuncios;
    const spinnerTemplate = buildListaAnunciosSpinnerView();

    this.anuncioListElement.innerHTML = spinnerTemplate;

    try {
      anuncios = await AnuncioService.getAnuncios();

      if (anuncios.length === 0) {
        this.anuncioListElement.innerHTML = buildNotFoundAnuncioView();
      }

      for (const anuncio of anuncios) {
        const anuncioArticleElement = document.createElement("article");
        const anuncioTemplate = buildAnuncioView(anuncio);

        anuncioArticleElement.innerHTML = anuncioTemplate;

        this.anuncioListElement.appendChild(anuncioArticleElement);
      }
    } catch (error) {
      // informar de error
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Error obteniendo anuncios"
      );

    } finally {
      const loader = this.anuncioListElement.querySelector(".loader");
      loader.remove();
    }
  }
}

/* 

misiones de un controlador:

- orquestación o intermediario entre vista y modelo.
- definir y manejar eventos
- validar datos
- gestinar errores
- desacoplamiento entre capas(vista y modelo)
- un controlador debe ocuparse de gestionar un nodo DOM
  en cuanto a datos que debe pintar y eventos que suceden
*/
