package repository

import "gorm.io/gorm"

type repoDB struct {
	Db *gorm.DB
}
