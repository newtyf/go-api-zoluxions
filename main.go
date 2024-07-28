package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/newtyf/go-api/routes"
)

func main() {

	// Cargar variables de entorno desde el archivo .env
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: Error loading .env file")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	app := fiber.New()
	app.Use(cors.New())
	app.Static("/", "./public")
	routes.SetupRoutes(app)

	log.Fatal(app.Listen(":" + port))
}
