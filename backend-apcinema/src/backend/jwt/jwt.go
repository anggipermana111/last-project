package jwt

import (
	"backend/models"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
)

func Token(role, email string) (data models.TokenAccess, err error) {
	Exp := jwt.Now().Add(time.Hour).Unix()

	if err = godotenv.Load(); err != nil {
		// fmt.Println("error di godotenv")
		return
	}

	uuid, _ := uuid.NewRandom()

	claims := models.ClaimsToken{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: jwt.NewTime(float64(Exp)),
			Issuer:    "http://localhost:8080",
			IssuedAt:  jwt.Now(),
			ID:        uuid.String(),
		},
		Role:  role,
		Email: email,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	sigAc, errAc := token.SignedString([]byte(os.Getenv("SECRET")))

	// sigAc, errAc := token.SignedString("a")

	if errAc != nil {
		// fmt.Println("error di signed string")
		return models.TokenAccess{}, errAc
	}

	data.Token = sigAc

	return
}
