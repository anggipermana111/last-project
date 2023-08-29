package routers

import (
	"backend/controller/repository"
	"backend/controller/usecase"
	"backend/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Routers struct {
	Db *gorm.DB
	R  *gin.Engine
}

type RoutersPayment struct {
	Model models.Transaction
	R     *gin.Engine
}

func (router Routers) Router() {
	v1 := router.R.Group("api")
	repo := repository.New(router.Db)

	usecase.NewFilm(repo, v1)
	usecase.NewGenre(repo, v1)
	usecase.NewUser(repo, v1)
	usecase.NewStudio(repo, v1)
	usecase.NewChair(repo, v1)
	usecase.NewFood(repo, v1)
	usecase.NewAdmin(repo, v1)
	usecase.NewShowSchedule(repo, v1)
	usecase.NewOrder(repo, v1)
	// usecase.NewTransaction(repo, v1)
}

func (router RoutersPayment) RoutesPayment(model models.Transaction) {
	v1 := router.R.Group("api")
	repo := repository.NewTransaction(model)
	usecase.NewTransaction(repo, v1)
}
