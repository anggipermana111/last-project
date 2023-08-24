package models

import "gorm.io/gorm"

type Film struct {
	// di grom model sudah terdapat id
	gorm.Model
	Judul        string  `json:"judul" gorm:"column:judul;type:character varying(150)"`
	Poster       string  `json:"poster" gorm:"column:poster;type:character varying(150)"`
	Deskripsi    string  `json:"deskripsi" gorm:"column:deskripsi"`
	Trailer      string  `json:"trailer" gorm:"column:trailer;type:character varying(150)"`
	Rating       float32 `json:"rating" gorm:"column:rating"`
	TanggalRilis string  `json:"tangal_rilis" gorm:"column:tangal_rilis;type:date"`
}
