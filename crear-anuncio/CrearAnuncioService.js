class CrearAnuncioService {
  constructor() {}

  async crearAnuncio(nombre, venta, precio, descripcion, foto) {
    const body = {
      nombre,
      venta,
      precio,
      descripcion,
      foto,
    };

    const response = await fetch("http://localhost:8000/api/anuncios", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
  }
}

export const crearAnuncioService = new CrearAnuncioService();
