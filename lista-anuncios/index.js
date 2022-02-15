import { NotificationController } from "../shared/notification/NotificationController.js";
import { ListaAnunciosController } from "./ListaAnunciosController.js";

document.addEventListener("DOMContentLoaded", async () => {
  const anuncioListElement = document.querySelector(".lista-anuncios");

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );

  const listaAnunciosController = new ListaAnunciosController(anuncioListElement);
  await listaAnunciosController.mostrarAnuncios();
});
