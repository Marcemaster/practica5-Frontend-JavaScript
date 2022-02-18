import { signupService } from "../signup/SignupService.js";

export default {
  async getAnuncios() {
    const url = "http://localhost:8000/api/anuncios";
    const badUrl = "https://hds.hel.fi/static/assets/placeholders/image/image-m@3x.png";

    let response;
    let anuncios;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("No he podido ir a por los anuncios");
    }

    if (!response.ok) {
      throw new Error("Anuncios no encontrados");
    }

    try {
      anuncios = await response.json();
    } catch (error) {
      throw new Error("No he podido transformar la respuesta a json");
    }

    return anuncios;
  },
  
  async getAnuncio(anuncioId) {
    const url = `http://localhost:8000/api/anuncios/${anuncioId}`;

    let response;
    let anuncio;

    try {
      response = await fetch(url);
    } catch (error) {
      throw new Error("No he podido ir a por el anuncio");
    }

    if (!response.ok) {
      throw new Error("Anuncio no encontrado");
    }

    try {
      anuncio = await response.json();
    } catch (error) {
      throw new Error("No he podido transformar la respuesta a json");
    }

    return anuncio;
  },
  
  async borrarAnuncio(anuncioId) {
    const url = `http://localhost:8000/api/anuncios/${anuncioId}`;

    let response;

    try {
      response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + signupService.getLoggedUser(),
        },
      });
    } catch (error) {
      throw new Error("No he podido borrar el anuncio");
    }

    if (!response.ok) {
      throw new Error("Anuncio no encontrado");
    }
  }  
};

/*

responsabilidad del modelo:

- abstraer al controlador y a la vista de la procedencia de los datos.

*/
