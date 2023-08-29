package repository

import (
	"backend/models"

	"gorm.io/gorm"
)

func NewFood(db *gorm.DB) repoDB {
	return repoDB{db}
}

func (repo repoDB) PostFood(data models.Food) error {
	if err := repo.Db.Create(&data).Error; err != nil {
		return err
	}
	return nil
}
func (repo repoDB) GetFood() (dataFood []models.Food, err error) {

	if err := repo.Db.Find(&dataFood).Error; err != nil {
		return nil, err
	}

	return
}
func (repo repoDB) UpdateFood(string, models.Food) error {
	return nil
}
