package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/newtyf/go-api/routes"
)

func main() {

	// Cargar variables de entorno desde el archivo .env
	if os.Getenv("ENVIRONMENT") == "development" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	// Obtener el puerto desde las variables de entorno
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000" // Valor por defecto si no se establece en .env
	}

	app := fiber.New()
	routes.SetupRoutes(app)

	log.Fatal(app.Listen(":" + port))
}
