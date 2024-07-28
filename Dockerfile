FROM golang:1.20-alpine AS build-server

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o /api

FROM node:20 AS build-client

WORKDIR /app

COPY ./client /app

RUN npm install
RUN npm run build

FROM golang:1.20-alpine AS run-server

WORKDIR /app

COPY --from=build-client /app/dist /app/public
COPY --from=build-server /api /app/api

EXPOSE 3000

CMD ["/app/api"]
