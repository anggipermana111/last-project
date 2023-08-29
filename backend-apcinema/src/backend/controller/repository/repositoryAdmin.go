package repository

import (
	"backend/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func NewAdmin(db *gorm.DB) repoDB {
	return repoDB{db}
}

func (repo repoDB) PostAdmin(data models.Admin) error {
	// bcrypt.CompareHashAndPassword()
	bytes, err := bcrypt.GenerateFromPassword([]byte(data.Password), 14)
	if err != nil {
		return err
	}
	data.Password = string(bytes)
	if err := repo.Db.Create(&data).Error; err != nil {
		return err
	}
	return nil
}
func (repo repoDB) GetAdmin() ([]models.Admin, error) {
	var dataAdmin []models.Admin

	if err := repo.Db.Find(&dataAdmin).Error; err != nil {
		return nil, err
	}

	return dataAdmin, nil
}

// Percobaan

func (repo repoDB) LoginAdmin(email string) (*models.Admin, error) {
	var admin models.Admin

	if err := repo.Db.First(&admin, "email=?", email).Error; err != nil {
		return nil, err
	}

	return &admin, nil
}
