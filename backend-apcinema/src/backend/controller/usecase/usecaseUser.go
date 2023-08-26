package usecase

import (
	"backend/controller"
	"backend/helper"
	"backend/jwt"
	"backend/middleware"
	"backend/models"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
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

func (use usecaseUser) Login(ctx *gin.Context) {
	var user models.User

	if err := ctx.ShouldBindJSON(&user); err != nil {
		helper.Response(ctx, http.StatusBadRequest, map[string]any{"Error": err.Error()})
		return
	}

	result, err := use.repo.Login(user.Email)

	// fmt.Println(result, err)

	if err != nil {
		helper.Response(ctx, http.StatusNotFound, map[string]any{"Error": err.Error()})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(user.Password)); err != nil {
		helper.Response(ctx, http.StatusInternalServerError, map[string]any{"Error": errors.New("password or username invalid")})
		return
	}

	token, errTok := jwt.Token("user", result.Email)

	if errTok != nil {
		helper.Response(ctx, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	ctx.SetCookie("token", token.Token, 8080, "/", "localhost", false, true)

	helper.Response(ctx, http.StatusOK, map[string]any{"Response": token})

}

func NewUser(repo controller.RepoUser, r *gin.RouterGroup) {
	rep := usecaseUser{repo}

	v2 := r.Group("user")

	v2.POST("add-user", rep.UsePostUser)
	v2.GET("get-user", middleware.AuthHandle(), rep.UseGetUser)
	v2.POST("login", rep.Login)
}
