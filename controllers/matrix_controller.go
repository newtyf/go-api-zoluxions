package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/newtyf/go-api/models"
	"gonum.org/v1/gonum/mat"
)

func isRectangularMatrix(matriz [][]float64) bool {
	if len(matriz) == 0 {
		return true // Una matriz vacía se considera rectangular
	}
	filaBase := len(matriz[0])
	for _, fila := range matriz {
		if len(fila) != filaBase {
			return false
		}
	}
	return true
}

func matrixToSlice(matrix *mat.Dense) [][]float64 {
	rows, cols := matrix.Dims()
	slice := make([][]float64, rows)
	for i := 0; i < rows; i++ {
		slice[i] = make([]float64, cols)
		for j := 0; j < cols; j++ {
			slice[i][j] = matrix.At(i, j)
		}
	}
	return slice
}

func GetQr(c *fiber.Ctx) error {
	var input models.MatrixInput

	if err := c.BodyParser(&input); err != nil {
		return c.Status(http.StatusBadRequest).SendString("Invalid input")
	}

	if len(input.Matrix) == 0 || len(input.Matrix[0]) == 0 {
		return c.Status(http.StatusBadRequest).SendString("Matrix cannot be empty")
	}

	if !isRectangularMatrix(input.Matrix) {
		return c.Status(http.StatusBadRequest).SendString("Matrix is not rectangular")
	}

	var data []float64
	for _, row := range input.Matrix {
		data = append(data, row...)
	}

	matrix := mat.NewDense(len(input.Matrix), len(input.Matrix[0]), data)
	var qr mat.QR
	qr.Factorize(matrix)

	rows, cols := matrix.Dims()
	q := mat.NewDense(rows, cols, nil)
	r := mat.NewDense(rows, cols, nil)

	qr.QTo(q)
	qr.RTo(r)

	qSlice := matrixToSlice(q)
	rSlice := matrixToSlice(r)

	result := models.QRResult{
		Q: qSlice,
		R: rSlice,
	}

	jsonData, err := json.Marshal(result)
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString("Can't convert to json")
	}
	node_host := os.Getenv("API_NODE")
	req, err := http.NewRequest("GET", node_host+"/calculate", bytes.NewBuffer(jsonData))
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString("Can't create the request")
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString("Can't connect to the api")
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return c.Status(resp.StatusCode).SendString("Received non-OK response from the API")
	}

	var response map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&response)
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString("Can't parse the response from the API")
	}

	return c.JSON(response)
}
