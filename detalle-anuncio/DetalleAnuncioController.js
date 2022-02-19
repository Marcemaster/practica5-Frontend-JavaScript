import { pubSub } from "../shared/pubSub.js";
import { signupService } from "../signup/SignupService.js";
import AnuncioService from "../lista-anuncios/AnuncioService.js";
import { buildAnuncioDetailView } from "../lista-anuncios/AnuncioView.js";
import { decodeToken } from "../utils/decodeToken.js";
import { buildSpinnerView } from "../lista-anuncios/AnuncioView.js";

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

        const spinnerTemplate = buildSpinnerView();
        const detalleAnunc = document.querySelector(".detalle-anuncio");
        detalleAnunc.innerHTML = spinnerTemplate;

        try {
            this.anuncio = await AnuncioService.getAnuncio(anuncioId);
            const anuncioTemplate = buildAnuncioDetailView(this.anuncio);
            this.detalleAnuncioElement.innerHTML = anuncioTemplate;
            this.handleDeleteButton();
        } catch (error) {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
        }
    }

    handleDeleteButton() {
        const loggedUserToken = localStorage.getItem("jwt");

        if (loggedUserToken) {
            // decodificamos token
            const userInfo = decodeToken(loggedUserToken);

            // comprobamos si el id de usuario logado es el mismo que el id del creador del anuncio
            const isOwner = this.isOwner(userInfo.userId);

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
            this.borrarAnuncio();
        });
    }

    async borrarAnuncio() {
        const shouldDelete = window.confirm(
            "¿Estás seguro de borrar el anuncio?"
        );

        if (shouldDelete) {
            try {
                await AnuncioService.borrarAnuncio(this.anuncio.id);
                window.location.href = "/";
            } catch (error) {
                pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
            }
        }
    }
}
