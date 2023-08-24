package models

import "gorm.io/gorm"

type User struct {
	// di grom model sudah terdapat id
	gorm.Model
	Email    string `json:"email" gorm:"column:email;type:character varying(150)"`
	Nama     string `json:"nama" gorm:"column:nama;type:character varying(150)"`
	Password string `json:"password" gorm:"column:password"`
}
