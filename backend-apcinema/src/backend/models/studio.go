package models

import "gorm.io/gorm"

type Studio struct {
	// di grom model sudah terdapat id
	gorm.Model
	Nama string `json:"nama" gorm:"column:nama;type:character varying(50)"`
}
