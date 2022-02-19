import { NotificationController } from "../shared/notification/NotificationController.js";
import { DetalleAnuncioController } from "./DetalleAnuncioController.js"


document.addEventListener("DOMContentLoaded", () => {
    const detalleAnuncioElement = document.querySelector(".detalle-anuncio");

    const notificationElement = document.querySelector(".notification");

    const notificationController = new NotificationController(
        notificationElement
    );

    const searchParams = new URLSearchParams(window.location.search);
    const anuncioId = searchParams.get("id");
    const detalleAnuncioController = new DetalleAnuncioController(detalleAnuncioElement);
    detalleAnuncioController.mostrarAnuncio(anuncioId);
});