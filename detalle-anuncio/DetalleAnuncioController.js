import { pubSub } from "../shared/pubSub.js";
// import { signupService } from "../signup/SignupService.js";
import AnuncioService from "../lista-anuncios/AnuncioService.js";
import { buildAnuncioDetailView } from "../lista-anuncios/AnuncioView.js";
// import { decodeToken } from "../utils/decodeToken.js";

export class DetalleAnuncioController {
  constructor(detalleAnuncioElement) {
    this.detalleAnuncioElement = detalleAnuncioElement;
    this.anuncio = null;
  }

  async mostrarAnuncio(anuncioId) {
    if (!anuncioId) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        "Id del anuncio no válido"
      );
      return;
    }

    try {
      this.anuncio = await AnuncioService.getAnuncio(anuncioId);
      const anuncioTemplate = buildAnuncioDetailView(this.anuncio);
      this.detalleAnuncioElement.innerHTML = anuncioTemplate;
      // this.handleDeleteButton();
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }

  /*
  handleDeleteButton() {
    const loggedUserToken = signupService.getLoggedUser();

    if (loggedUserToken) {
      // decodificamos token
      const userInfo = decodeToken(loggedUserToken);

      // comprobamos si el id de usuario logado es el mismo que el id del creador del anuncio
      const isOwner = this.isOwner(userInfo.user.id);
      console.log(isOwner);

      // pintamos botón
      if (isOwner) {
        this.drawDeleteButton();
      }
    }
  }

  isOwner(userId) {
    return userId === this.anuncio.userId;
  }

  drawDeleteButton() {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Borrar Anuncio";

    this.detalleAnuncioElement.appendChild(buttonElement);

    this.detalleAnuncioElement.addEventListener("click", () => {
      this.deleteAnuncio();
    });
  }

  async deleteAnuncio() {
    const shouldDelete = window.confirm("¿Estás seguro de borrar el anuncio?");

    if (shouldDelete) {
      try {
        await AnuncioService.deleteAnuncio(this.anuncio.id);
        window.location.href = "/";
      } catch (error) {
        // utilizamos pubsub
      }
    }
  }

  */
}
