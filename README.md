**IMBD dashboard**

This was the second project that I did as part of my Code institute course. It is a Data Visualisation app project
that plots information of particular genres on differnet graphs for e.g.

1. Bar Chart
2. Line Chart
3. Pie Charts
4. Composite Chart

**Components**

**Flask**

Flask is a micro framework driven by python that is used to serve the data used and render all of the HTML pages
used for the application.

**Crossfilter.js**

A javascript based data manipulation library that enables two way binding, click any of the graphs and you
will see all the other graphs filter based on that click.

**d3.js**

Visulaisation engine thats driven by javascript. Its job is to render charts and graphs in svg format when they are given data.
From there the data is then passed into divs created in graphs.html.

**Dc.js**

this is a wrapper library driven by javascript for d3.js.

**MongoDB**

For this project the datasource was obtained from a website called Kaggle ( Link at bottom of description )
The data had to be downloaded as a csv file. My particular dataset had vast amounts of data that was not need needed.
So the the dataset was edited down using Excel and Robomongo

https://www.kaggle.com/

**Python**

Had to create a movies.py file for this project that renders the graph.html page in the project. From there
it builds a webserver using pymongo that interacts with Mongo DB database.

**Deployment of project**

The project was deployed on the wonderful Heroku. A Few things needed to be done to allow the
project to be deployed. A python package called gunicorn was needed to run the http server for the app, a procfile was
then created. Its job is to give Heroku the information it needs to run the app. Finally a requirements.txt was created, this contains 
all of the python packages that are needed. These where installed through the command line using the "pip install" command.
While running locally though when I was working on the project MongoDB was used to host the dataset on the server.
Localhost:5000 was used in the browser to view my work.

**Testing**

This project was tested on google Chrome throughout the building process

**Project Built with**

1.Html

2.CSS

3.Flask

4.Bootstrap

5.Mongo DB database

6.Javascript Libraries used: dc.js, d3.js, crossfilter.js, queue.js 

7.Dataset obtained from https://www.kaggle.com/

**Live Demo**

Click on the link provided to view deployed version

https://com-dash-imdb.herokuapp.com/

**Installation**

following instructions are for windows users to get this project up and running.

1. Download Robomongo and MongoDb

2. Go to the folder you created that you want to clone the project. From your terminal type the following:
   "git clone https://github.com/BrianSheridan/Stream-2-project.git"
   
3.Create an new Virtual enviorment in the terminal: 

"python -m venv name_of_virtualenv"

the activate it:

"VirtualEnv/name_of_virtualEnv/bin/scripts/activate"

4. Install all project dependancies: "pip install -r requirements.txt"

5. Get your mongod running: "mongod --config config/mongoConfig.conf"

6: Open up the the folder in VS Code using ". code" in your terminal

7. Find the "Movie.py" file, right click on it and select the "Run python file in the terminal"

8. Go to your browser and type "localhost:5000" you should see it running from there.

**BALSAMIQ WIREFRAME FOR THIS PROJECT FOUND IN THE "WIREFRAME" FOLDER IN SIDE THE STATIC/IMAGES FOLDER**


  








