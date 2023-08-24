package repository

import (
	"backend/models"

	"gorm.io/gorm"
)

// Film
func NewFilm(db *gorm.DB) repoDB {
	return repoDB{db}
}

func (repo repoDB) PostFilm(data models.Film) error {
	if err := repo.Db.Create(&data).Error; err != nil {
		return err
	}

	return nil
}
func (repo repoDB) GetFilm() ([]models.Film, error) {
	var dataFilm []models.Film

	if err := repo.Db.Find(&dataFilm).Error; err != nil {
		return nil, err
	}

	return dataFilm, nil
}
func (repo repoDB) GetFilmById(id string) (film *models.Film, err error) {
	if err := repo.Db.First(&film, "id=?", id).Error; err != nil {
		return nil, err
	}
	return film, nil
}
func (repo repoDB) UpdateFilm(string, models.Film) error {
	return nil
}
func (repo repoDB) Delete(uint) error {
	return nil
}
