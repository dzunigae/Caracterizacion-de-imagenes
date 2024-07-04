let data;
// Objeto para almacenar la frecuencia de cada píxel único
let pixelFrequencies;
let sortedPixels;
//Diccionario con los tonos de colores representativos
let tonos = {
  
}

document.getElementById("Imagen").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Ajustar tamaño del canvas al tamaño de la imagen
        canvas.width = img.width;
        canvas.height = img.height;

        // Dibujar la imagen en el canvas
        ctx.drawImage(img, 0, 0);

        // Acceder a los píxeles
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        data = imageData.data; // Array con los datos de píxeles (RGBA)

        // Mostrar el canvas en lugar de la imagen original
        const previsualizacion = document.getElementById("previsualizacion");
        previsualizacion.src = canvas.toDataURL(); // Convertir el canvas de nuevo a una URL de datos
        previsualizacion.style.display = "inline";
      };
      img.src = e.target.result; // Cargar la imagen desde FileReader
    };
    reader.readAsDataURL(file); // Leer el archivo como una URL de datos (base64)
  }
});

function procesamiento() {
  pixelFrequencies = {};

  // Recorrer cada píxel en la imagen
  for (let i = 0; i < data.length; i += 4) {
    // Incremento de 4 porque cada píxel ocupa 4 valores (RGBA)
    const r = data[i]; // Canal Rojo
    const g = data[i + 1]; // Canal Verde
    const b = data[i + 2]; // Canal Azul

    // Crear una clave única para el píxel basada en sus componentes RGB
    const pixelKey = `${r},${g},${b}`;

    // Si el pixelKey ya existe en pixelFrequencies, aumentar su frecuencia
    if (pixelKey in pixelFrequencies) {
      pixelFrequencies[pixelKey]++;
    } else {
      // Si no existe, inicializar su frecuencia a 1
      pixelFrequencies[pixelKey] = 1;
    }
  }

  // Ahora pixelFrequencies contiene la frecuencia de cada píxel único en la imagen
  console.log("Cantidad de pixeles:", data.length / 4);
  console.log(
    "Cantidad de píxeles únicos:",
    Object.keys(pixelFrequencies).length
  );

  // Obtener los 10 píxeles con mayor frecuencia
  sortedPixels = Object.keys(pixelFrequencies)
    .sort((a, b) => pixelFrequencies[b] - pixelFrequencies[a])
    .slice(0, 50);

  const container = document.getElementById("container");
  container.innerHTML = ""; // Eliminar todos los hijos del contenedor

  // Recorrer la lista ordenada de píxeles y crear elementos HTML para cada uno
  sortedPixels.forEach((pixel) => {
    // Crear un div para representar el color
    const colorBox = document.createElement("div");
    colorBox.className = "color-box";

    // Dividir la cadena en un array de valores de cadena
    const rgbArray = pixel.split(',');

    // Convertir cada valor de cadena en un número
    const [r, g, b] = rgbArray.map(Number);
    
    colorBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // Crear un span para mostrar el valor RGB
    const rgbText = document.createElement("span");
    rgbText.textContent = `RGB: (${pixel})`;

    // Añadir el color y el texto RGB al contenedor
    container.appendChild(colorBox);
    container.appendChild(rgbText);
  });
}

function tonos_principales(){

}