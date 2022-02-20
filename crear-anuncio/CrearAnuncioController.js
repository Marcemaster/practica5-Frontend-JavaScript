import { pubSub } from "../shared/pubSub.js";
import { crearAnuncioService } from "./CrearAnuncioService.js";
import { decodeToken } from "../utils/decodeToken.js";

export class CrearAnuncioController {
  constructor(formElement) {
    this.formElement = formElement;

    this.onSubmitForm();
  }

  onSubmitForm() {
    this.formElement.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(this.formElement);

      const nombre = formData.get("nombre")
      const venta = formData.get("venta")
      const precio = formData.get("precio")
      const descripcion = formData.get("descripcion")
      const foto = formData.get("foto") || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&usqp=CAU"

      try {
        crearAnuncioService.crearAnuncio(nombre, venta, precio, descripcion, foto);
        window.location.href = "/";
      } catch (error) {
        pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
      }
    });
  }
}
