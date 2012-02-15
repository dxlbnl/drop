

function onReady() {
	// setup the stylesheet
	model = new Model();
	
	TableView.implement(PageMixin);
	
	mainWindow = new MainWindow();
	vlayout = new Layout(mainWindow);
	hlayout = new Layout(vlayout);
	v2layout = new Layout(hlayout);
	
	vlayout.setDirection("vertical");
	v2layout.setDirection("vertical");
	
	lineedit = new LineEdit(vlayout);
	
	
	movies = new TableView(hlayout);	
	movies.setModel(model);
	movies.setHeading(['title', 'rating']);
	
	lineedit1 = new LineEdit(v2layout);
	
	movies = new TableView(v2layout);	
	movies.setModel(model);
	movies.setHeading(['_id', 'title', 'rating']);
	
	lineedit.setValue("Hello");
	lineedit1.setValue("World!");
	
	Signal.connect(lineedit.valueChanged, lineedit1, lineedit1.setValue);
	
	
console.log(document.readyState);
}

console.log(document.readyState);
window.onload = onReady;