import { NotificationController } from "../shared/notification/NotificationController.js";
import { ListaAnunciosController } from "./ListaAnunciosController.js";
import { handleLoggedUser } from "../shared/loggedUser/loggedUser.js";


document.addEventListener("DOMContentLoaded", async () => {
  const anuncioListElement = document.querySelector(".lista-anuncios");

  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(
    notificationElement
  );

  const listaAnunciosController = new ListaAnunciosController(anuncioListElement);
  handleLoggedUser();
  await listaAnunciosController.mostrarAnuncios();
});

