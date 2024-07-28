package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/newtyf/go-api/controllers"
)

func SetupRoutes(app *fiber.App) {
	app.Post("/qr", controllers.GetQr)
}
