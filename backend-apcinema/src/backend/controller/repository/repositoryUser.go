package repository

import (
	"backend/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func NewUser(db *gorm.DB) repoDB {
	return repoDB{db}
}

func (repo repoDB) PostUser(data models.User) error {
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
func (repo repoDB) GetUser() ([]models.User, error) {
	var dataUser []models.User

	if err := repo.Db.Find(&dataUser).Error; err != nil {
		return nil, err
	}

	return dataUser, nil
}

// Percobaan

func (repo repoDB) Login(email string) (*models.User, error) {
	var user models.User

	if err := repo.Db.First(&user, "email=?", email).Error; err != nil {
		return nil, err
	}

	return &user, nil
}
