package models

import "github.com/dgrijalva/jwt-go/v4"

type ClaimsToken struct {
	jwt.StandardClaims
	Role  string
	Email string
}

type TokenAccess struct {
	Token string
}
