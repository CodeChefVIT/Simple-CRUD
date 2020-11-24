package controllers

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/google/uuid"

	"github.com/44t4nk1/Simple-CRUD/GoREST/api/models"

	"github.com/gin-gonic/gin"
)

//CreateBook ...
func (server *Server) CreateBook(c *gin.Context) {
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error reading records"})
		return
	}
	book := models.Book{}
	book.BeforeCreate()
	err = json.Unmarshal(body, &book)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error in JSON"})
		return
	}
	bookCreated, err := book.SaveBook(server.DB)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Could not save data"})
		return
	}
	c.JSON(200, bookCreated)
}

//GetBooks ...
func (server *Server) GetBooks(c *gin.Context) {
	book := models.Book{}
	books, err := book.FindAllBooks(server.DB)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"books": books})
}

//GetBook ...
func (server *Server) GetBook(c *gin.Context) {
	id := c.Param("uuid")
	bookid, err := uuid.Parse(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Could not parse UUID"})
		return
	}
	book := models.Book{}
	bookGotten, err := book.FindBookByID(server.DB, bookid)
	c.JSON(http.StatusOK, bookGotten)
}

//UpdateBook ...
func (server *Server) UpdateBook(c *gin.Context) {
	id := c.Param("uuid")
	bookid, err := uuid.Parse(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Could not parse UUID"})
		return
	}
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error reading records"})
		return
	}
	book := models.Book{}
	err = json.Unmarshal(body, &book)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "Error in JSON"})
		return
	}
	updatedBook, err := book.UpdateBook(server.DB, bookid)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error in updating Data"})
		return
	}
	c.JSON(http.StatusOK, updatedBook)
}

//DeleteBook ...
func (server *Server) DeleteBook(c *gin.Context) {
	id := c.Param("uuid")
	bookid, err := uuid.Parse(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Could not parse UUID"})
		return
	}
	book := models.Book{}
	_, err = book.DeleteABook(server.DB, bookid)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error in deleting a record"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "record deleted"})
}
