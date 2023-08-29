package controller

import "backend/models"

type RepoFilm interface {
	PostFilm(models.Film) error
	GetFilm() ([]models.Film, error)
	UpdateFilm(string, models.Film) error
	// Delete(uint) error
	GetFilmById(string) (*models.Film, error)
	GetGenresByIds([]uint, *[]models.Genre) error
	UpdateFilmGenres(string, []models.Genre) error
}

type RepoGenre interface {
	PostGenre(models.Genre) error
	GetGenre() ([]models.Genre, error)
	UpdateGenre(string, models.Genre) error
}

type RepoUser interface {
	// Post register
	PostUser(models.User) error
	GetUser() ([]models.User, error)
	Login(email string) (*models.User, error)
}

type RepoLogin interface {
	Login()
}

type RepoAdmin interface {
	// Post register
	PostAdmin(models.Admin) error
	GetAdmin() ([]models.Admin, error)
	LoginAdmin(email string) (*models.Admin, error)
}

type RepoShowSchedule interface {
	PostShowSchedule(models.ShowSchedule) error
	GetShowSchedule() ([]models.ShowSchedule, error)
	GetShowFilmByID(uint, *models.Film) error
	GetShowStudioByID(uint, *models.Studio) error
	GetShowScheduleByFilmID(string) ([]models.ShowSchedule, error)
	GetShowSchedulesByFilmAndStudio(filmID, studioID string) ([]models.ShowSchedule, error)
	GetDistinctFilms() ([]models.Film, error)
	GetShowScheduleByIDSchedule(string) (*models.ShowSchedule, error)
}

type RepoStudio interface {
	GetStudio() ([]models.Studio, error)
}

type RepoChair interface {
	GetChair() ([]models.Chair, error)
	UpdateChair(string, models.Chair) error
	GetAvailableChairs(orderID string) ([]models.Chair, error)
}

type RepoFood interface {
	PostFood(models.Food) error
	GetFood() ([]models.Food, error)
	UpdateFood(string, models.Food) error
}

type RepoOrder interface {
	GetUserByID(userID uint, user *models.User) error
	GetShowScheduleByID(scheduleID uint, schedule *models.ShowSchedule) error
	GetChairByCode(chairCode string, chair *models.Chair) error
	PostOrder(order models.Order) error
}

type PaymentRepo interface {
	TransactionPost(models.Transaction) (models.ResponseTrans, error)
}
