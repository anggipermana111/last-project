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
func (repo repoDB) GetGenre() ([]models.Genre, error) {
	return nil, nil
}
func (repo repoDB) UpdateGenre(string, models.Genre) error {
	return nil
}