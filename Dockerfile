FROM golang:1.20-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

COPY .env .env

RUN go build -o /api

EXPOSE 3000

CMD ["/api"]
