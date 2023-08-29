package usecase

import (
	"backend/controller"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func NewTransaction(repo controller.PaymentRepo, r *gin.RouterGroup) {
	use := usecaseHandler{repo}
	r.POST("post", use.TransactionPost)
}

type usecaseHandler struct {
	repo controller.PaymentRepo
}

// pemakaian
func (use usecaseHandler) TransactionPost(ctx *gin.Context) {
	var data models.Transaction
	if err := ctx.ShouldBindJSON(&data); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	res, err := use.repo.TransactionPost(data)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	ctx.JSON(http.StatusOK, res)
}
