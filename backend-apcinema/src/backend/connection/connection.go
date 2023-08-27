package connection

import (
	"backend/models"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connection() *gorm.DB {
	// Panggil fungsi godotenv.Load() untuk memuat variabel lingkungan dari file .env
	if err := godotenv.Load(); err != nil {
		log.Fatal("failed load environtment")
	}

	// deklar variabel dari .env
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")

	// fmt.Sprintf mengembalikan string yang telah diformat
	destination := fmt.Sprintf("user=%s password=%s dbname=%s port=%s sslmode=disable", dbUser, dbPass, dbName, dbPort)

	// database: Variabel yang akan menyimpan koneksi database.
	// err: Variabel untuk menangani kesalahan.
	// gorm.Open(...): Fungsi untuk membuka koneksi database dengan GORM.
	// postgres.Open(destination): Fungsi driver PostgreSQL untuk membuka koneksi.
	// &gorm.Config{}: Konfigurasi kosong untuk penggunaan GORM.
	database, err := gorm.Open(postgres.Open(destination), &gorm.Config{})

	if err != nil {
		log.Fatal("failed connect database")
	}

	// AutoMigrate otomatis membuat atau memperbarui skema tabel di database sesuai dengan definisi model yang diberikan
	database.AutoMigrate(&models.Film{})
	database.AutoMigrate(&models.Genre{})
	database.AutoMigrate(&models.User{})
	database.AutoMigrate(&models.Studio{})

	return database
}
