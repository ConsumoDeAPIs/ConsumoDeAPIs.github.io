// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Obtiene el botón de generar QR y el contenedor de resultados
    const generateButton = document.getElementById('generate');
    const resultContainer = document.getElementById('result');
    const urlInput = document.getElementById('qrInput'); // Campo de entrada para el texto del QR

    // Agrega un evento click al botón de generar QR
    generateButton.addEventListener('click', async () => {
        // Obtiene el valor ingresado en el campo de texto
        const data = urlInput.value;
        const fmt = 'png'; // Define el formato de la imagen QR como PNG
        const apiKey = 'UGUGF1MuBMBvdZHxoEMM1A==fFqB68iPsbrGS1Mx'; // Reemplaza con tu clave API real

        // Construye la URL para la solicitud a la API
        const apiUrl = `https://api.api-ninjas.com/v1/qrcode?data=${encodeURIComponent(data)}&format=${fmt}`;

        try {
            // Realiza una solicitud GET a la API para generar el código QR
            const response = await fetch(apiUrl, {
                headers: {
                    'X-Api-Key': apiKey, // Incluye la clave de API en los encabezados
                    'Accept': 'image/png' // Indica que se espera una imagen PNG como respuesta
                }
            });

            // Verifica si la respuesta fue exitosa
            if (response.ok) {
                // Convierte la respuesta en un blob (objeto de archivo)
                const blob = await response.blob();
                // Crea una URL temporal para la imagen
                const imgUrl = URL.createObjectURL(blob);
                // Crea un nuevo elemento de imagen
                const img = document.createElement('img');
                img.src = imgUrl; // Asigna la URL de la imagen al atributo src
                img.alt = "Código QR"; // Texto alternativo para la imagen

                // Limpia el contenedor de resultados para eliminar cualquier QR anterior
                resultContainer.innerHTML = '';
                // Añade la nueva imagen al contenedor de resultados
                resultContainer.appendChild(img);
            } else {
                // Si hubo un error en la respuesta, muestra el error en la consola
                const errorText = await response.text();
                console.error("Error:", response.status, errorText);
                alert('Ocurrió un error al generar el código QR.'); // Muestra una alerta al usuario
            }
        } catch (error) {
            // Maneja cualquier error de la solicitud
            console.error("Request error:", error);
            alert('Ocurrió un error al generar el código QR.'); // Muestra una alerta al usuario
        }
    });
});

