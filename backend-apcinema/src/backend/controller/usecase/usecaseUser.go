package usecase

import (
	"backend/controller"
	"backend/helper"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type usecaseUser struct {
	repo controller.RepoUser
}

func (use usecaseUser) UsePostUser(contex *gin.Context) {
	var data models.User

	if err := contex.ShouldBindJSON(&data); err != nil {
		helper.Response(contex, http.StatusBadRequest, map[string]any{"Error": err.Error()})
		return
	}

	if err := use.repo.PostUser(data); err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": "Berhasil Tambah User Baru"})
}

func (use usecaseUser) UseGetUser(contex *gin.Context) {
	res, err := use.repo.GetUser()

	if err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": res})
}

func NewUser(repo controller.RepoUser, r *gin.RouterGroup) {
	rep := usecaseUser{repo}

	v2 := r.Group("user")

	v2.POST("add-user", rep.UsePostUser)
	v2.GET("get-user", rep.UseGetUser)
}
