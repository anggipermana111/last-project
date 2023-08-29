package models

import (
	"gorm.io/gorm"
)

type ShowSchedule struct {
	gorm.Model
	Tanggal  string `json:"tanggal" gorm:"column:tanggal;type:character varying(30)"`
	Jam      string `json:"jam" gorm:"column:jam;type:character varying(30)"`
	FilmID   uint   `json:"film_id" gorm:"column:film_id"`
	StudioID uint   `json:"studio_id" gorm:"column:studio_id"`
	Film     Film   `json:"film" gorm:"foreignKey:FilmID"`
	Studio   Studio `json:"studio" gorm:"foreignKey:StudioID"`
}
