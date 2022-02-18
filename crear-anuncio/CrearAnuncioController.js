import { pubSub } from "../shared/pubSub.js";
import { crearAnuncioService } from "./CrearAnuncioService.js";
import { decodeToken } from "../utils/decodeToken.js";

export class CrearAnuncioController {
  constructor(formElement) {
    this.formElement = formElement;

    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.onAnyInputChange();
    this.onSubmitForm();
  }

  onAnyInputChange() {
    const inputElements = Array.from(
      this.formElement.querySelectorAll("input")
    );

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const areInputsFilled = inputElements.every(
          (inputElement) => inputElement.value
        );

        if (areInputsFilled) {
          this.formElement.querySelector("button").removeAttribute("disabled");
        } else {
          this.formElement.querySelector("button").setAttribute("disabled", "");
        }
      });
    });
  }

  onSubmitForm() {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(this.formElement);

      this.crearAnuncio(formData)
    });
  }

  async crearAnuncio(formData) {
    try {
      await crearAnuncioService.crearAnuncio(formData);

      // console.log("Anuncio creado correctamente"); 
      window.location.href = "/";  
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
      console.log("Ha habido un error");
    }
  }
}
