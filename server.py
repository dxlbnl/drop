import tornado.web



class List(tornado.web.RequestHandler):
	
	def get(self):
		f = open("static/index.html")
		self.write(f.read())
		f.close()

	
application = tornado.web.Application([
	(r"/", List),
    (r"/static/(.*)", tornado.web.StaticFileHandler, {"path": "static"}),
    
    (r"/(favicon\.ico)", tornado.web.StaticFileHandler, {"path": "static"}),
],
	debug = True, 
)

if __name__ == "__main__":
	port = 8888
	
	print "\nStarting server on localhost:{}\n".format(port)
	application.listen(port)
	tornado.ioloop.IOLoop.instance().start()