import { CrearAnuncioController } from "./CrearAnuncioController.js";
import { NotificationController } from "../shared/notification/NotificationController.js";
import { handleLoggedUser } from "../shared/loggedUser/loggedUser.js"

document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.querySelector("form");
  const notificationElement = document.querySelector(".notification");

  const notificationController = new NotificationController(notificationElement);

  const crearAnuncioController = new CrearAnuncioController(formElement);
  handleLoggedUser()
});