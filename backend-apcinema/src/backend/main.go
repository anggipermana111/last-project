package main

import (
	"backend/connection"
	"backend/middleware"
	"backend/models"
	"backend/routers"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	db := connection.Connection()

	routs := routers.Routers{
		R:  router,
		Db: db,
	}

	var model models.Transaction

	routs2 := routers.RoutersPayment{
		R:     router,
		Model: model,
	}

	router.Static("/assets", "./public")

	middleware.CorsHandle(routs.R)
	middleware.CorsHandle(routs2.R)

	routs.Router()
	routs2.RoutesPayment(model)

	router.Run()
}
