package controller

import "backend/models"

type RepoFilm interface {
	PostFilm(models.Film) error
	GetFilm() ([]models.Film, error)
	UpdateFilm(string, models.Film) error
	Delete(uint) error
	GetFilmById(string) (*models.Film, error)
}

type RepoGenre interface {
	PostGenre(models.Genre) error
	GetGenre() ([]models.Genre, error)
	UpdateGenre(string, models.Genre) error
}

type RepoUser interface {
	PostUser(models.User) error
	GetUser() ([]models.User, error)
}
