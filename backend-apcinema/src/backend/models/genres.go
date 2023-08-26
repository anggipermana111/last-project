package models

import "gorm.io/gorm"

type Genre struct {
	// di grom model sudah terdapat id
	gorm.Model
	Nama  string `json:"nama" gorm:"column:nama;type:character varying(50)"`
	Films []Film `gorm:"many2many:film_genres;"`
}
