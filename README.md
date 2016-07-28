# Corporate Dashboard Application

Project #4 for the [Udacity Senior Web Developer Nanodegree](https://www.udacity.com/course/senior-web-developer-nanodegree--nd802)

## Project Brief 

You must develop a corporate dashboard application using a front-end MVC framework of your choosing. The dashboard application must contain a header (with the currently selected dashboard’s name); a menu, allowing the user to navigate between dashboards; and the primary dashboard display area. You should find, or create, your own data files in CSV and JSON formats to provide data to the dashboards. The required dashboards are:

1. A "geospatial" view, identifying the number of employees at various company locations.
2. A “key metrics” view, containing components displaying: the number of open issues, a line chart reflecting number of paying customers over a period of time, and a bar chart reflecting number of reported issues over a period of time.
3. A “data" view of all issues, with an appearance similar to a spreadsheet, that is sortable and filterable. An issue should contain the following fields:
	- submission timestamp
	- customer name
	- customer email address
	- description
	- open/closed status
	- closed timestamp
	- employee name


## Requirements 

- App includes all requirements, including header, menu, and all dashboard views
- App is equally functional on mobile and desktop, using responsive design to ensure its displayed in a useable state.
- Application makes use of a Front-End Framework (e.g. `Backbone`, `Angular`, `Ember`, et cetera) and properly separates data from the user interface.
- Each dashboard uses external data files (data not stored directly within the application). At least one file must be a `comma-separated value` (`.csv`) and at least one must be `.json`.
- Dashboard components must query the datafiles regularly, or receive `“push”` updates, and update their displays in “near” real-time without requiring a refresh of the application.
- App includes a build process (such as Grunt or Gulp). Assets are minimized and concatenated as appropriate.

## My Application