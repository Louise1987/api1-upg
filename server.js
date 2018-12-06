
//Startar server
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

// css mapp
app.use(express.static('public')); 

//--------------------------------------------------------------------------------
//Hämtar rhyme.json
 var fs_data = fs.readFileSync('./rhyme.json');
 var rhyme = JSON.parse(fs_data);
//--------------------------------------------------------------------------------
//Hämtar pug
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
//--------------------------------------------------------------------------------
//Hämtar form
app.get('/start', function(request, response){
	return response.render('get-form')
});
//--------------------------------------------------------------------------------
//Hämtar data i form
app.get('/getsubmit', function(request, response){

	var find = request.query.key;
	var searched = request.query.value;

	
	if(rhyme[find]){
		console.log(rhyme[find]);
		response.send(rhyme[find]);
	}else{
		response.send("inget att skicka");
	}
});

//--------------------------------------------------------------------------------
//Sparar data
app.get('/add', function(request, response){
	return response.render('add-form');
});

//--------------------------------------------------------------------------------
		//Skriver till sträng i rhyme.json
	function changeData(rhyme){
		var add_data = JSON.stringify(rhyme);
		fs.writeFileSync('./rhyme.json', add_data);
	}
//--------------------------------------------------------------------------------
//Skriver ut ny data i lista
	app.get('/addsubmit', function(request, response){

		var addKey = request.query.key;
		var addValue = request.query.value;

		rhyme[addKey]=addValue;
		console.log(rhyme);

		//kallar på changeData
		changeData(rhyme);
		response.send("Data tillagd");

	 });
//-------------------------------------------------------------------------------
//Tar bort data
app.get('/delete', function(request, response){
	return response.render('delete-form');
});
//-------------------------------------------------------------------------------
//Tar bort data från lista
app.get('/deletesubmit', function(request, response){

	var key = request.query.key;

		if(delete rhyme[key]){

			//kallar på changeData
			changeData(rhyme);

			console.log(rhyme);
		response.send("Data borttagen");
		}else{
			response.send("Finns ingen data att ta bort");
		}
});



//--------------------------------------------------------------------------------
//Server lyssnar på localhost:3000
app.listen(3000, listening);
function listening(){
   console.log("listening...")
}












