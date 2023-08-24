package helper

import "github.com/gin-gonic/gin"

func Response(contex *gin.Context, statusCode int, response map[string]any) {
	contex.AbortWithStatusJSON(statusCode, response)
}
