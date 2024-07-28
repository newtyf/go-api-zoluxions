package models

type MatrixInput struct {
	Matrix [][]float64 `json:"matrix"`
}

type QRResult struct {
	Q [][]float64 `json:"Q"`
	R [][]float64 `json:"R"`
}
