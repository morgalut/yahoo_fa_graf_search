##readme##

app.py -- Flask app
is main file to run the app
run it with `python app.py`

##test folder##
this folder contains test files
for example:

this is the test file for stock routes

this command will run the test file:
curl -X GET http://localhost:5000/api/stock/all_stocks
curl -X GET http://localhost:5000/api/stock/AAPL
curl -X GET "http://localhost:5000/api/stock/search?q=AAPL"

to test the stock routes use terminal in the `backend` folder
