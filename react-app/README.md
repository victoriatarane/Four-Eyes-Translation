Four Eyes Translation

Four Eyes Translation is a web application that helps customers place orders for three different types of language services. It was inspired by a necessity for such a service.


Link to live site: https://four-eyes-translation.herokuapp.com/


Link to GitHub repo: https://github.com/victoriatarane/Four-Eyes-Translation


Summary of what the project is and what it does:

The Four Eyes Translation web application consists of three order form types with a possibility to upload source documents. Four Eyes Translation gives a customer an instant quote for the order of choice based on the word count in a source document or a desired word count range. 
The customer can place an order, view all orders of all types, edit orders and delete them. 



Instructions on how to build/run the project (installation instructions)

In order to Run this web application locally you will need to create a .env file with Database variables for your local machine. When that is done you will need to create a database, upgrade it and seed it. 
In order to enable the possibility to upload files you will need to add a secret key for your AWS bucket. 
After that is done you will need two terminals: backend and front end. In backend terminal you will need to activate the virtual environment with the `pipenv shell` command. After that has been done you can start backend with `flask run` command. In order to start frontend terminal you will need to cd into the react repo and `npm install`. After npm installation is finished you can `npm start`.
Navigate to your localhost:3000 to see app in work.


React Components list (if you used React)
*Auth
*Order
*Profile
*About
*DemoUser
*Home
*NavBar

Database Schema: https://dbdiagram.io/d/60ff118b28da596eb54e279b
