package usecase

import (
	"backend/controller"
	"backend/helper"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type usecaseFilm struct {
	repo controller.RepoFilm
}

func (use usecaseFilm) UsePostFilm(contex *gin.Context) {
	var data models.Film

	if err := contex.ShouldBindJSON(&data); err != nil {
		helper.Response(contex, http.StatusBadRequest, map[string]any{"Error": err.Error()})
		return
	}

	if err := use.repo.PostFilm(data); err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": "Berhasil Tambah Film Baru"})
}

func (use usecaseFilm) UseGetFilm(contex *gin.Context) {
	res, err := use.repo.GetFilm()

	if err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": res})
}

func (use usecaseFilm) UseGetFilmById(contex *gin.Context) {
	type Input struct {
		Id string `uri:"id"`
	}

	var input Input

	if err := contex.ShouldBindUri(&input); err != nil {
		helper.Response(contex, http.StatusBadRequest, map[string]any{"Error": err.Error()})
		return
	}

	res, err := use.repo.GetFilmById(input.Id)

	if err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": res})
}

func (use usecaseFilm) UseUpdateFilm(contex *gin.Context) {

}
func (use usecaseFilm) UseDelete(contex *gin.Context) {

}

func NewFilm(repo controller.RepoFilm, r *gin.RouterGroup) {
	rep := usecaseFilm{repo}

	v2 := r.Group("film")

	v2.POST("add-film", rep.UsePostFilm)
	v2.GET("get-film", rep.UseGetFilm)
	v2.GET("get-film/:id", rep.UseGetFilmById)
}
