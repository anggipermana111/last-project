package usecase

import (
	"backend/controller"
	"backend/helper"
	"backend/jwt"

	// "backend/jwt"
	"backend/models"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type usecaseAdmin struct {
	repo controller.RepoAdmin
}

// func (use usecaseAdmin) UsePostAdmin(contex *gin.Context) {
// 	var data models.Admin

// 	if err := contex.ShouldBindJSON(&data); err != nil {
// 		helper.Response(contex, http.StatusBadRequest, map[string]any{"Error": err.Error()})
// 		return
// 	}

// 	if err := use.repo.PostAdmin(data); err != nil {
// 		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
// 		return
// 	}

// 	helper.Response(contex, http.StatusOK, map[string]any{"Response": "Berhasil Tambah Admin Baru"})
// }

func (use usecaseAdmin) UsePostAdmin(contex *gin.Context) {
	var data models.Admin

	if err := contex.ShouldBindJSON(&data); err != nil {
		helper.Response(contex, http.StatusBadRequest, map[string]interface{}{"Error": err.Error()})
		return
	}

	if err := use.repo.PostAdmin(data); err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]interface{}{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]interface{}{"Response": "Berhasil Tambah Admin Baru"})
}

func (use usecaseAdmin) UseGetAdmin(contex *gin.Context) {
	res, err := use.repo.GetAdmin()

	if err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": res})
}

func (use usecaseAdmin) LoginAdmin(ctx *gin.Context) {
	var admin models.Admin

	if err := ctx.ShouldBindJSON(&admin); err != nil {
		helper.Response(ctx, http.StatusBadRequest, map[string]any{"Error": err.Error()})
		return
	}

	result, err := use.repo.LoginAdmin(admin.Email)

	// fmt.Println(result, err)

	if err != nil {
		helper.Response(ctx, http.StatusNotFound, map[string]any{"Error": err.Error()})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(admin.Password)); err != nil {
		helper.Response(ctx, http.StatusInternalServerError, map[string]any{"Error": errors.New("password or adminname invalid")})
		return
	}

	token, errTok := jwt.Token("admin", result.Email)

	if errTok != nil {
		helper.Response(ctx, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	ctx.SetCookie("token", token.Token, 8080, "/", "localhost", false, true)

	helper.Response(ctx, http.StatusOK, map[string]any{"Response": token})

}

func NewAdmin(repo controller.RepoAdmin, r *gin.RouterGroup) {
	rep := usecaseAdmin{repo}

	v2 := r.Group("admin")

	v2.POST("add-admin", rep.UsePostAdmin)
	// v2.GET("get-admin", middleware.AuthHandle(), rep.UseGetAdmin)
	v2.GET("get-admin", rep.UseGetAdmin)
	v2.POST("login", rep.LoginAdmin)
}
