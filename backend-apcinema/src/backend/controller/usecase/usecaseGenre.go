package usecase

import (
	"backend/controller"
	"backend/helper"
	"backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Genre
type usecaseGenre struct {
	repo controller.RepoGenre
}

func (use usecaseGenre) UsePostGenre(contex *gin.Context) {
	var data models.Genre

	if err := contex.ShouldBindJSON(&data); err != nil {
		helper.Response(contex, http.StatusBadRequest, map[string]any{"Error": err.Error()})
		return
	}

	if err := use.repo.PostGenre(data); err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": "Berhasil Tambah Genre Baru"})
}

func (use usecaseGenre) UseGetGenre(contex *gin.Context) {
	res, err := use.repo.GetGenre()

	if err != nil {
		fmt.Println("error di usegetgenre")
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": res})
}

func (use usecaseGenre) UpdateGenre(string, models.Genre) {

}

func NewGenre(repo controller.RepoGenre, r *gin.RouterGroup) {
	rep := usecaseGenre{repo}

	v2 := r.Group("genre")

	// v2.POST("add-genre", middleware.AuthHandle(), rep.UsePostGenre)
	v2.POST("add-genre", rep.UsePostGenre)
	// v2.GET("get-genre", middleware.AuthHandleUser(), rep.UseGetGenre)
	v2.GET("get-genre", rep.UseGetGenre)
}
