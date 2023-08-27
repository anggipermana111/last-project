package repository

import (
	"backend/models"

	"gorm.io/gorm"
)

func NewStudio(db *gorm.DB) repoDB {
	return repoDB{db}
}

func (repo repoDB) GetStudio() (dataStudio []models.Studio, err error) {

	if err := repo.Db.Find(&dataStudio).Error; err != nil {
		return nil, err
	}

	return
}
