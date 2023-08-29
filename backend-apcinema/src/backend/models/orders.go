package models

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	Total          uint         `json:"total" gorm:"column:total"`
	UserID         uint         `json:"user_id" gorm:"column:user_id"`
	ShowScheduleID uint         `json:"showschedule_id" gorm:"column:showschedule_id"`
	User           User         `json:"user" gorm:"foreignKey:UserID"`
	ShowSchedule   ShowSchedule `json:"showschedule" gorm:"foreignKey:ShowScheduleID"`
	Chairs         []Chair      `gorm:"many2many:order_chairs;"`
}
