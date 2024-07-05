let data;
// Objeto para almacenar la frecuencia de cada píxel único
let pixelFrequencies;
let sortedPixels;
//Objeto con los tonos de colores representativos
let colorCategorias_Frecuencia = [
  {
    name: "Negro y grises oscuros",
    frecuencia: 0,
  },
  {
    name: "Grises medios",
    frecuencia: 0,
  },
  {
    name: "Blanco y grises claros",
    frecuencia: 0,
  },
  {
    name: "Rojos claros",
    frecuencia: 0,
  },
  {
    name: "Rojos oscuros",
    frecuencia: 0,
  },
  {
    name: "Verdes claros",
    frecuencia: 0,
  },
  {
    name: "Verdes oscuros",
    frecuencia: 0,
  },
  {
    name: "Azules claros",
    frecuencia: 0,
  },
  {
    name: "Azules oscuros",
    frecuencia: 0,
  },
  {
    name: "Amarillos claros",
    frecuencia: 0,
  },
  {
    name: "Amarillos oscuros",
    frecuencia: 0,
  },
  {
    name: "Cyanes claros",
    frecuencia: 0,
  },
  {
    name: "Cyanes oscuros",
    frecuencia: 0,
  },
  {
    name: "Magentas claros",
    frecuencia: 0,
  },
  {
    name: "Magentas oscuros",
    frecuencia: 0,
  },
  {
    name: "Morados claros",
    frecuencia: 0,
  },
  {
    name: "Morados oscuros",
    frecuencia: 0,
  },
  {
    name: "Naranjas claros",
    frecuencia: 0,
  },
  {
    name: "Naranjas oscuros",
    frecuencia: 0,
  },
  {
    name: "Marrón claro",
    frecuencia: 0,
  },
  {
    name: "Marrón oscuro",
    frecuencia: 0,
  },
];
const colorCategories = [
  {
    name: "Negro y grises oscuros",
    ranges: [{ r: [0, 50], g: [0, 50], b: [0, 50] }],
  },
  {
    name: "Grises medios",
    ranges: [{ r: [51, 200], g: [51, 200], b: [51, 200] }],
  },
  {
    name: "Blanco y grises claros",
    ranges: [{ r: [201, 255], g: [201, 255], b: [201, 255] }],
  },
  {
    name: "Rojos claros",
    ranges: [{ r: [200, 255], g: [0, 150], b: [0, 150] }],
  },
  {
    name: "Rojos oscuros",
    ranges: [{ r: [100, 199], g: [0, 100], b: [0, 100] }],
  },
  {
    name: "Verdes claros",
    ranges: [{ r: [0, 150], g: [200, 255], b: [0, 150] }],
  },
  {
    name: "Verdes oscuros",
    ranges: [{ r: [0, 100], g: [100, 199], b: [0, 100] }],
  },
  {
    name: "Azules claros",
    ranges: [{ r: [0, 150], g: [0, 150], b: [200, 255] }],
  },
  {
    name: "Azules oscuros",
    ranges: [{ r: [0, 100], g: [0, 100], b: [100, 199] }],
  },
  {
    name: "Amarillos claros",
    ranges: [{ r: [200, 255], g: [200, 255], b: [0, 150] }],
  },
  {
    name: "Amarillos oscuros",
    ranges: [{ r: [100, 199], g: [100, 199], b: [0, 100] }],
  },
  {
    name: "Cyanes claros",
    ranges: [{ r: [0, 150], g: [200, 255], b: [200, 255] }],
  },
  {
    name: "Cyanes oscuros",
    ranges: [{ r: [0, 100], g: [100, 199], b: [100, 199] }],
  },
  {
    name: "Magentas claros",
    ranges: [{ r: [200, 255], g: [0, 150], b: [200, 255] }],
  },
  {
    name: "Magentas oscuros",
    ranges: [{ r: [100, 199], g: [0, 100], b: [100, 199] }],
  },
  {
    name: "Morados claros",
    ranges: [{ r: [150, 255], g: [0, 100], b: [150, 255] }],
  },
  {
    name: "Morados oscuros",
    ranges: [{ r: [75, 150], g: [0, 75], b: [75, 150] }],
  },
  {
    name: "Naranjas claros",
    ranges: [{ r: [200, 255], g: [100, 200], b: [0, 50] }],
  },
  {
    name: "Naranjas oscuros",
    ranges: [{ r: [150, 200], g: [50, 100], b: [0, 50] }],
  },
  {
    name: "Marrón claro",
    ranges: [{ r: [150, 200], g: [75, 100], b: [0, 50] }],
  },
  {
    name: "Marrón oscuro",
    ranges: [{ r: [75, 150], g: [37, 75], b: [0, 37] }],
  },
];

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

  // Obtener los 50 píxeles con mayor frecuencia
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
    const rgbArray = pixel.split(",");

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

function tonos_principales() {
  Object.keys(pixelFrequencies).forEach(
    (pixel) => {
      // Dividir la cadena en un array de valores de cadena
      const rgbArray = pixel.split(",");
      
      // Convertir cada valor de cadena en un número
      const [r, g, b] = rgbArray.map(Number);

      let name = categorizeColor(r,g,b);

      console.log(name);

      /*for (const category of colorCategorias_Frecuencia){
        if (category.name == name){
          category.frecuencia++;
        }
      }*/
    }
  );
  //Porcentajes
  /*for(const color of colorCategorias_Frecuencia){
    const porcentage = (color.frecuencia/(data.length / 4))*100
    console.log(`${color.name}: ${porcentage}%`);
  }*/
}

function categorizeColor(r, g, b) {
  for (const category of colorCategories) {
      for (const range of category.ranges) {
          if (
              r >= range.r[0] && r <= range.r[1] &&
              g >= range.g[0] && g <= range.g[1] &&
              b >= range.b[0] && b <= range.b[1]
          ) {
              return category.name;
          }
      }
  }
  return "Uncategorized";
}