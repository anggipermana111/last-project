package models

type Chair struct {
	Kode  string `json:"kode" gorm:"primarykey;column:kode;type:character varying(3)"`
	Harga uint   `json:"harga" gorm:"column:harga;type:bigint"`
}
