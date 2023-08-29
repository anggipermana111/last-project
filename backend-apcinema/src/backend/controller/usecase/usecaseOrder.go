package usecase

import (
	"backend/controller"
	"backend/helper"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type usecaseOrder struct {
	repo controller.RepoOrder
}

func (use usecaseOrder) UsePostOrder(ctx *gin.Context) {
	var requestBody struct {
		Total          uint     `json:"total" binding:"required"`
		UserID         uint     `json:"user_id" binding:"required"`
		ShowScheduleID uint     `json:"showschedule_id" binding:"required"`
		Chairs         []string `json:"chairs" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&requestBody); err != nil {
		helper.Response(ctx, http.StatusBadRequest, map[string]interface{}{"Error": err.Error()})
		return
	}

	// Load User by ID
	var user models.User
	if err := use.repo.GetUserByID(requestBody.UserID, &user); err != nil {
		helper.Response(ctx, http.StatusNotFound, map[string]interface{}{"Error": "User not found"})
		return
	}

	// Load ShowSchedule by ID
	var showSchedule models.ShowSchedule
	if err := use.repo.GetShowScheduleByID(requestBody.ShowScheduleID, &showSchedule); err != nil {
		helper.Response(ctx, http.StatusNotFound, map[string]interface{}{"Error": "ShowSchedule not found"})
		return
	}

	// Load Chairs by IDs
	var chairs []models.Chair
	for _, chairCode := range requestBody.Chairs {
		var chair models.Chair
		if err := use.repo.GetChairByCode(chairCode, &chair); err != nil {
			helper.Response(ctx, http.StatusNotFound, map[string]interface{}{"Error": "Chair not found"})
			return
		}
		chairs = append(chairs, chair)
	}

	// Buat data Order baru
	newOrder := models.Order{
		Total:        requestBody.Total,
		User:         user,
		ShowSchedule: showSchedule,
		Chairs:       chairs,
	}

	if err := use.repo.PostOrder(newOrder); err != nil {
		helper.Response(ctx, http.StatusInternalServerError, map[string]interface{}{"Error": err.Error()})
		return
	}

	helper.Response(ctx, http.StatusOK, map[string]interface{}{"Response": "Berhasil Menambah Order Baru"})
}

func NewOrder(repo controller.RepoOrder, r *gin.RouterGroup) {
	rep := usecaseOrder{repo}

	v2 := r.Group("order")

	v2.POST("add-order", rep.UsePostOrder)
}
