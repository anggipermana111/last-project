package middleware

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CorsHandle(r *gin.Engine) {
	config := cors.Config{}

	config.AllowOrigins = []string{"http://localhost:5173", "http://localhost:5174"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	config.AllowMethods = []string{"POST", "PUT", "GET", "DELETE"}
	config.AllowCredentials = true

	r.Use(cors.New(config))
}
