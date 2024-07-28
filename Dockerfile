FROM golang:1.20-alpine AS build-server

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o /api

FROM node:20 AS build-client

WORKDIR /app

COPY . .

RUN cd ./client; npm install
RUN cd ./client ;npm run build

FROM golang:1.20-alpine AS run-server

WORKDIR /app

COPY --from=build-client /app/client/dist /app/public
COPY --from=build-server /api /app/api

EXPOSE 3000

CMD ["/app/api"]
