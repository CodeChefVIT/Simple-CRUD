package controllers

func (s *Server) initializeRoutes() {
	s.Router.POST("/books", s.CreateBook)
	s.Router.GET("/books", s.GetBooks)
	s.Router.GET("/books/:uuid", s.GetBook)
	s.Router.PATCH("/books/:uuid", s.UpdateBook)
	s.Router.DELETE("/books/:uuid", s.DeleteBook)
}
