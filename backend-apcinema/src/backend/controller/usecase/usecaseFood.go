package usecase

import (
	"backend/controller"
	"backend/helper"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type usecaseFood struct {
	repo controller.RepoFood
}

func (use usecaseFood) UsePostFood(contex *gin.Context) {
	var data models.Food

	if err := contex.ShouldBindJSON(&data); err != nil {
		helper.Response(contex, http.StatusBadRequest, map[string]any{"Error": err.Error()})
		return
	}

	if err := use.repo.PostFood(data); err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": "Berhasil Tambah Makanan Baru"})
}

func (use usecaseFood) UseGetFood(contex *gin.Context) {
	res, err := use.repo.GetFood()

	if err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": res})
}

func (use usecaseFood) UpdateFood(string, models.Genre) {

}

func NewFood(repo controller.RepoFood, r *gin.RouterGroup) {
	rep := usecaseFood{repo}

	v2 := r.Group("food")

	// v2.POST("add-food", middleware.AuthHandle(), rep.UsePostFood)
	v2.POST("add-food", rep.UsePostFood)
	// v2.GET("get-genre", middleware.AuthHandleUser(), rep.UseGetGenre)
	v2.GET("get-food", rep.UseGetFood)
}
