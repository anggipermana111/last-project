package repository

import (
	"backend/models"

	"gorm.io/gorm"
)

func NewGenre(db *gorm.DB) repoDB {
	return repoDB{db}
}

func (repo repoDB) PostGenre(data models.Genre) error {
	if err := repo.Db.Create(&data).Error; err != nil {
		return err
	}
	return nil
}
func (repo repoDB) GetGenre() (dataGenre []models.Genre, err error) {

	if err := repo.Db.Find(&dataGenre).Error; err != nil {
		return nil, err
	}

	return
}
func (repo repoDB) UpdateGenre(string, models.Genre) error {
	return nil
}
