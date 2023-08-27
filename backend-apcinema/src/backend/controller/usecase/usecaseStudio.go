package usecase

import (
	"backend/controller"
	"backend/helper"
	"net/http"

	"github.com/gin-gonic/gin"
)

type usecaseStudio struct {
	repo controller.RepoStudio
}

func (use usecaseStudio) UseGetStudio(contex *gin.Context) {
	res, err := use.repo.GetStudio()

	if err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": res})
}

func NewStudio(repo controller.RepoStudio, r *gin.RouterGroup) {
	rep := usecaseStudio{repo}

	v2 := r.Group("studio")

	// v2.GET("get-genre", middleware.AuthHandleUser(), rep.UseGetGenre)
	v2.GET("get-studio", rep.UseGetStudio)
}
