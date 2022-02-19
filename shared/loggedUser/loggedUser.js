import { decodeToken } from "../../utils/decodeToken.js";
import { pubSub } from "../pubSub.js";

export function handleLoggedUser() {
    const loggedUserToken = localStorage.getItem("jwt");
    if (loggedUserToken) {
        try {
          const userInfo = decodeToken(loggedUserToken);
          userInfo.username // Para comprobar que el JWT no ha sido modificado manualmente.
          const crearAnuncioTemplate = `<a href="/crear-anuncio.html">Crear Anuncio</a>`;
          const navElement = document.querySelector(".topnav");
          navElement.lastChild.remove()
          navElement.lastChild.remove()
          navElement.lastChild.remove()
          navElement.lastChild.remove()
          const cerrarSesionTemplate = `<a onclick='logOut()' href="/" id="exit">Cerrar Sesión</a>`;
          navElement.innerHTML += crearAnuncioTemplate
          navElement.innerHTML += cerrarSesionTemplate
        } catch (error) {
          pubSub.publish(
            pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
            "Error en el login"
        );
        }
    }
}