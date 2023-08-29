package repository

import "gorm.io/gorm"

type repoDB struct {
	Db *gorm.DB
}

func New(db *gorm.DB) repoDB {
	return repoDB{db}
}
