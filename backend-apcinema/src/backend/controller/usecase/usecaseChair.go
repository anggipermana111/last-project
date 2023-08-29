package usecase

import (
	"backend/controller"
	"backend/helper"
	"net/http"

	"github.com/gin-gonic/gin"
)

type usecaseChair struct {
	repo controller.RepoChair
}

func (use usecaseChair) UseGetChair(contex *gin.Context) {
	res, err := use.repo.GetChair()

	if err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": res})
}

func (use usecaseChair) UseGetAvailableChairs(ctx *gin.Context) {
	orderID := ctx.Param("order_id")

	chairs, err := use.repo.GetAvailableChairs(orderID)
	if err != nil {
		helper.Response(ctx, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(ctx, http.StatusOK, map[string]any{"Response": chairs})
}

func NewChair(repo controller.RepoChair, r *gin.RouterGroup) {
	rep := usecaseChair{repo}

	v2 := r.Group("chair")

	v2.GET("get-chair", rep.UseGetChair)
	v2.GET("get-booked-chair/:order_id", rep.UseGetAvailableChairs)
}
