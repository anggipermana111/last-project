package models

import "gorm.io/gorm"

type Food struct {
	// di grom model sudah terdapat id
	gorm.Model
	Nama  string `json:"nama" gorm:"column:nama;type:character varying(50)"`
	Harga uint   `json:"harga" gorm:"column:harga;type:bigint"`
}
