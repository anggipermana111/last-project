package main

import (
	"backend/connection"
	"backend/middleware"
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

	middleware.CorsHandle(routs.R)

	routs.Router()

	router.Run()
}
