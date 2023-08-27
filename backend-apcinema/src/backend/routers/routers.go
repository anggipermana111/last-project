package routers

import (
	"backend/controller/repository"
	"backend/controller/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Routers struct {
	Db *gorm.DB
	R  *gin.Engine
}

func (router Routers) Router() {
	v1 := router.R.Group("api")
	repo := repository.NewFilm(router.Db)

	usecase.NewFilm(repo, v1)
	usecase.NewGenre(repo, v1)
	usecase.NewUser(repo, v1)
	usecase.NewStudio(repo, v1)
}
