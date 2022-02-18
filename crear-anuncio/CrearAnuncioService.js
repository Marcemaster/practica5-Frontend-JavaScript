class CrearAnuncioService {
  constructor() {}

  async crearAnuncio(formData) {
    const body = {
      nombre: formData.get("nombre"),
      venta: formData.get("venta"),
      precio: formData.get("precio"),
      foto:
        formData.get("foto") ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&usqp=CAU",
      descripcion: formData.get("descripcion"),
    };

    // El body sale bien hasta aquí.

    const response = await fetch("http://localhost:8000/api/anuncios", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });

    const data = await response.json();

    // La respuesta da un 201 (OK)

    if (!response.ok) {
      throw new Error(data.message);
    }
  }
}

export const crearAnuncioService = new CrearAnuncioService();
