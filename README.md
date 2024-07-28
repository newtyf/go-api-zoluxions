# Proyecto de API en Golang con Fiber

Este proyecto es una API desarrollada en Golang utilizando el framework Fiber. La API incluye funcionalidades básicas de un servidor HTTP y está diseñada para recibir y procesar matrices para cálculos matemáticos.

## Requisitos

- [Golang](https://golang.org/dl/) (1.18 o superior)
- [Node.js](https://nodejs.org/) (16.x o superior)
- [Docker](https://www.docker.com/products/docker-desktop) (opcional, para ejecución en contenedor)

## Instalación

### Clonar el Repositorio

Primero, clona el repositorio en tu máquina local:

```sh
git clone https://github.com/newtyf/go-api-zoluxions.git
cd go-api-zoluxions
```

### Instalación de Dependencias

Asegúrate de tener Golang instalado y el entorno configurado. Luego, instala las dependencias del proyecto con:

```sh
go mod tidy
```

Para las dependencias debemos ejecutar
```sh
cd client
npm run install
```

### Configuración

Configura cualquier variable de entorno necesaria. Puedes crear un archivo `.env` en la raíz del proyecto para definir estas variables.

Ejemplo de archivo `.env`:

```env
API_NODE=http://localhost:3001
PORT=3000
ENVIRONMENT=development
```

## Uso

### Ejecutar la Aplicación

Para ejecutar la aplicación localmente, utiliza el siguiente comando:

```sh
go run main.go
```

```sh
cd client
npm run dev
```

La aplicación se ejecutará en el puerto 3000 y 5173 por defecto. Puedes acceder a la API en `http://localhost:3000` y al cliente en `http://localhost:5173`.

### Ejecutar en Docker

Si prefieres ejecutar la aplicación en un contenedor Docker, puedes construir y ejecutar la imagen con los siguientes comandos:

1. **Construir la Imagen de Docker**

   ```sh
   docker build -t nombre-de-tu-imagen .
   ```

2. **Ejecutar el Contenedor**

   ```sh
   docker run -p 3000:3000 nombre-de-tu-imagen
   ```

## Endpoints

### `POST /qr`

Este endpoint recibe una matriz rectangular

**Cuerpo de la Solicitud (JSON):**

```json
{
  "matrix": [[0,0,0],[0,0,0],[0,0,0]]
}
```

**Respuesta (JSON):**

```json
{
  "valorMaximo": -0.12309149097933281,
  "valorMinimo": -11.078234188139948,
  "promedio": -1.0240793467157438,
  "sumaTotal": -30.72238004076818,
  "QEsDiagonal": false,
  "REsDiagonal": false
}
```

### 💻 Author

- Portfolio - [@newtyf](https://newtyf.com)
- Instagram - [@newtyf](https://www.instagram.com/newt_yf/)
- LinkedIn - [@newtyf](https://www.linkedin.com/in/axel-mu%C3%B1oz/)
- Frontend Mentor - [@newtyf](https://www.frontendmentor.io/profile/TREz-bits)