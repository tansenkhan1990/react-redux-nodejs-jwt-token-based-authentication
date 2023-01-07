# Frontend part

run yarn command to install dependencies
run yarn start to start the application

# Frontend Workflow

Three dorpdown menus contains date, month and year and those information are loading from backend get api /records.

we load date, month and year data from /records for our dropdown menu.

onSumit it check three conditions the form should not empty, the date should be valid and the date is more than 18 years ago.

validation of the date should be valid and the date is more than 18 years ago done through the backend api /date and if all condition match it store the data at date collection otherwise not. In both cases this api give a response of json object which contains
{
isDateInvalid: response.isDateInvalid,
isUnderAge: response.isUnderAge,
isDataUpdated: response.isDataUpdated,
}
this response object is store in Redux and based on those values show the conditional message box.

# Backend part

run yarn to install dependencies
run yarn develop to start the server

# Backend WorkFlow

Mongodb connected with mongo atlas
Database name birthday, collections name dates and records
Two api call /date and /records
/date store only valid data after validation
/records api response and object which contains
{
date: [1,2,3,4,5,6....31],
month : [1,2,3,4,5....12],
year :[1990,1991,1992...2020]
}

# Extra

Follow a proper big project structure

# Backend

Three seperate api /auth, /logout and /protected for token based authentication with http cookie only

After hit /auth route you can access /protected route but once you hit /logout route private route /protected will not be accessable and this is protected with jwt token

Routes are protected with a seperate middleware function.

# Frontend part

Develop a seperate class named Api which contains axios configuration for handling public and private route with localStorage.getItem("jwt") and all kinds of request such as get and post etc.
