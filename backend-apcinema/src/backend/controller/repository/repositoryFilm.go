package repository

import (
	"backend/models"
	"fmt"

	"gorm.io/gorm"
)

// Film
func NewFilm(db *gorm.DB) repoDB {
	return repoDB{db}
}

func (repo repoDB) PostFilm(data models.Film) error {
	if err := repo.Db.Create(&data).Error; err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}
func (repo repoDB) GetFilm() ([]models.Film, error) {
	var films []models.Film

	if err := repo.Db.Preload("Genres").Find(&films).Error; err != nil {
		return nil, err
	}

	return films, nil
}
func (repo repoDB) GetFilmById(id string) (film *models.Film, err error) {
	if err := repo.Db.Preload("Genres").First(&film, "id=?", id).Error; err != nil {
		return nil, err
	}
	return film, nil
}
func (repo repoDB) UpdateFilm(id string, film models.Film) error {
	if err := repo.Db.Where("id=?", id).Updates(film).Error; err != nil {
		fmt.Println("gagal")
		fmt.Println(err)
		return err
	}
	return nil
}

func (repo repoDB) GetGenresByIds(ids []uint, genres *[]models.Genre) error {
	if err := repo.Db.Find(genres, ids).Error; err != nil {
		return err
	}
	return nil
}

// UpdateFilmGenres updates the genres associated with a film.
func (repo repoDB) UpdateFilmGenres(filmID string, genres []models.Genre) error {
	// First, delete existing genre associations for the given film
	if err := repo.Db.Exec("DELETE FROM film_genres WHERE film_id = ?", filmID).Error; err != nil {
		return err
	}

	// Now, insert new genre associations
	for _, genre := range genres {
		if err := repo.Db.Exec("INSERT INTO film_genres (film_id, genre_id) VALUES (?, ?)", filmID, genre.ID).Error; err != nil {
			return err
		}
	}

	return nil
}

// func (repo repoDB) Delete(uint) error {
// 	return nil
// }
