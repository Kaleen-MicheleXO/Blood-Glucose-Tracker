# Blood-Glucose-Tracker

Blood Glucose Tracker is a full Stack application to help  diabetics keep up with there blood sugar from day to day.Users are able to input there 
blood sugar number and this site is able to tell them if there blood sugar is in range simply by the use of an emoji. Users are also able to delete 
there blood sugar data.<br>

**Link to site:** https://bloodsugar-tracker.herokuapp.com
<img width="1467" alt="blood-Sugar-Tracker" src="https://user-images.githubusercontent.com/101673372/184558810-10919e80-7725-43c2-8bb0-80eabb0f7617.png">

# How It's Made:
**Tech used:** EJS/CSS, JavaScript, Node.js, Express, MongoDB, Heroku

for the back end of this application 'get' 'post' and 'delete' api was created in order to render the page, post new data to the site and delete data.
I used MongoDB to store all of my data and it was inputed into a ejs template which was deplayed for the client to be seen. For the emoji I was able
to hide and unhide the emoji in the client side JavaScript depending on if the blood sugar number the client put into the text. Once the site was 
finished I was able to push the data onto a server using Heroku.

# Optimizations
I was able to change the delete function on the server side to delete from the Id that mongoDB gave it instead of deleting it by the date. I was able
to do this by using the MongoDb function ObjectId()  and storing the id on the ejs side.This allowed the site to be more effiencent as If I were to change 
anything in the future to this site it will still be able to retrive and delete the data.


# Lessons Learned:
After creating this site I learned a lot about CRUD operations and storing data into MongoDb. I also learned a lot about ejs and the syntax that it uses 
which can be a little confusing to understand at first.This site was a great learning opportunity to creating a full stack application as well as using a
database to store the data.
