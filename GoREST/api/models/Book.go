package models

import (
	uuid "github.com/google/uuid"
	"github.com/jinzhu/gorm"
)

type Book struct {
	UUID        uuid.UUID `gorm:"primary_key" json:"uuid"`
	Title       string    `gorm:"size:255;not null;unique" json:"title"`
	Author      string    `gorm:"size:255;not null;unique" json:"author"`
	ImageURL    string    `gorm:"size:255;not null;unique" json:"image_url"`
	Description string    `gorm:"size:255;not null;unique" json:"description"`
}

func (b *Book) BeforeCreate() {
	newuuid := uuid.New()
	b.UUID = newuuid
}

func (b *Book) SaveBook(db *gorm.DB) (*Book, error) {
	var err error
	err = db.Debug().Create(&b).Error
	if err != nil {
		return &Book{}, err
	}
	return b, err
}

func (b *Book) FindAllBooks(db *gorm.DB) (*[]Book, error) {
	var err error
	books := []Book{}
	err = db.Debug().Model(&Book{}).Limit(100).Find(&books).Error
	if err != nil {
		return &[]Book{}, err
	}
	return &books, err
}
