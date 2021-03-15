# Welcome to TipsyStack!

Hi! Welcome to TipsyStack it is a open source blog/forum site where all the spirits coneseurs congregate about their passion for spirits and all relative topics of this fascinating world art, recipe, history and tradecraft. 

Click the Image below to go the website:

[<img src=https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/Martini%20logo%20nav-bar.png>](https://tipsy-stack.herokuapp.com)

[Git Hub Repo Link](https://github.com/Mikhail-Kashin/Team-Phobos-TipsyStack)

## Wiki-links

[MVP Feature List](https://github.com/Mikhail-Kashin/Team-Phobos-TipsyStack/wiki/MVP-Feature-List)
[Database Schema](https://github.com/Mikhail-Kashin/Team-Phobos-TipsyStack/wiki/Database-Schema)
[Frontend Routes](https://github.com/Mikhail-Kashin/Team-Phobos-TipsyStack/wiki/Frontend-Routes)
[API Documentation](https://github.com/Mikhail-Kashin/Team-Phobos-TipsyStack/wiki/API-Documentation)

## To-Do 

### Non-Functional Goals

1.  Build a fully functional forum web platform from scratch using JS, Pug, CSS and PostgreSQL.

### Minimum Functional Goals

1.  Implement custom user authentication using BCrypt library.
2.  Allow users to create an account and multiple thread pages for questions.
3.  Let users post, edit and delete questions and answers at their leisure in the website.
4.  Allow users to search questions and posts.
5. Allow users to vote on questions.

### Stretch Functinoal Goals

1.  Implement a more efficient / direct search using regular expressions and be able to search for answer as well.
2.  Allow users to comment on questions and answers.
3.  Post Drink pics in Answer sections.
4. Polymophic Up/Down Votes: For Questions, Answers, Comments
5. Appy Question Tags System and utilize is as additional way to search for specific subject/catergories base on tag names. 
6. Splash Page
7. User Profile and Page

# Primary Pages and Features

## Splash/Index/Home page

![Spash-Home Page](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/splash-home-page.png)

This page is what our visitors will first see, from here they can view recent questions ask, log in, sign-up, 
search for questions. 

## Sign-up

![Sign-up-form](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/sign-in%20form.png)

When you press the sign-up link, it will bring you to this page our sign- up form. It is where our visitors become our of TipsyStack users. 

## Log-in

![Log-in-form](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/log-in%20form.png)


After pressing log-in from home/spash page you will be brought here, where a register user can log-in or visitors can log-in with our "Demo Log in" to be able to try out sites full features without having to register.  Also here you can see job listings relating to spirits. You can see a list of our Users going in the 'Users" link under "Public" on our side bar. Use it to find a friend or a network contact. See Below...


![Users-Page](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/all%20users.png)   


## Cocktail-Qs (recent/all/searched)

After signing in or loging in will bring you to this page...

To Our Most recent Cocktail-Q page:

![Recent Cocktail-Q Page](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/recent%20cocktail-Qs.png)


You can browse most recent Cocktail-Qs or  go to bottom of page and click on "Show All Botton" to view all of Cocktail-Qs

![show-all-button](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/bottom%20of%20the%20recent%20Cocktail-q%20recent%20pages.png) 



### All of the Cocktail-Qs currently in the site

![All of The CocktailQs Page](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/all%20of%20cocktail-Q.png)

### Searching Cocktail-Qs

Using the search bar on the nav bar will bring up relating Cocktail-Qs based on the letter to word you have entered. And will bring you to our search-page result.

![Search-result-Page](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/search-result.png)


## Cocktail-Q and Cocktail-As Page

![Cocktail-Q and Cocktail-As Page](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/question%26answer.png)

This is the page where you brought to after click one of Cocktail-Qs. This is where you can post Cocktail-Q or Post a Cocktail-A towards the current Cocktail-Q. It is also where as register user can vote on Cocktail-As. As register user if you are the owner of the Cocktail-Q or one Cocktail-A this is where you can initiate edit of those items or delete it all together. 

## User Page

![User-Page](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/user's%20page.png)

As an added bonus, individual users can go to "My Profile" under Personal Links Header on our side-bar to see all the Cocktail-Qs and Cocktail-As that they have posted throughout the site. From here you can click-on any Cocktail-Q and Cocktail-A you have created and will be re-directed on the corresponding page to edit or  delete those items or just review that particular thread.

# Adapting the Project on your own Local Machines


First go to the [Git Hub Repo Link](https://github.com/Mikhail-Kashin/Team-Phobos-TipsyStack) and fork it to your own repository.

After than lunch your terminal/ubuntu and go the project directory  `cd Team-Phobos-TipsyStack` .

You after going to project directory you can do a `npm install` to get the dependencies for this project or you can lunch vscode from the terminal while being on the directory by using command `code .` in the terminal. Then open the terminal from the vs code while on the main directory and you can use `npm install` to get the dependencies.

On the main directory create a file called `.env` here you can do to file called `.env.example` and copy all the contents in that file and copy in your `.env`file that you just created. 

After that go to your terminal and utilize command `psql` to lunch your Psql and create a user name `tipsy_stack_app` with password `password` and have "createdb" privilege. 

Enter command in your psql.

    CREATE USER tipsy_stack_app WITH PASSWORD "password" CREATEDB;

After create of the user entering the command enter the following commands via terminal:

    npx dotenv sequelize db:create
  Then we need to migrate database...

    npx dotenv sequelize db:migrate

After that we can seed the tables with the test cases and initial entry values.

    npx dotenv sequelize db:seed:all

If successful and error free then your database for the project should be set up. Good Job!

You can now just put in the command in your terminal `npm start` to launch nodemon leave that running in the vs-code minimize vs-code and go to your browser and type in `localhost:8080` to be able to enjoy our website locally on your own machine. 


## How to Use TipsyStack:

1.  Go to  [https://tipsy-stack.herokuapp.com/](https://tipsy-stack.herokuapp.com/)
2.  Log in quickly with the Demo User or create a new account.
3.  Search existing Cocktail-Q or create a thread and posts of your own!
4. Bestow some of your Spirits knowledge and post a Cocktail-A on the corresponding Cocktail-Q.

```
No special instructions, the forum site is fully functional!
```

# Overall Structure

![](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/node%20js%20npm.png =250x)    ![](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/pugIcon.png =250x)

![](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/5096fabbfd8edd3a5eeb3d66cb93762b86d0f7a7/public/images/css3.svg =250x) ![](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/jsIcon.png =250x)

![](https://raw.githubusercontent.com/Mikhail-Kashin/Team-Phobos-TipsyStack/main/public/images/6lu26u1oaysf8cdfiiux.png =250x)





#### [](https://github.com/Mikhail-Kashin/Team-Phobos-TipsyStack)Back end

The app was built using  on the back end with a postgreSQL database and JavaScript. Back end structure is RESTful and all the data requests use AJAX and are fulfilled with a JSON API. Associations are used to prefetch data in order to minimize SQL queries to the database.

#### [](https://github.com/Mikhail-Kashin/Team-Phobos-TipsyStack)Front end

The front end is built completely in  Pug.js  and JavaScript and utilizes  CSS architecture. 

#### [](https://github.com/Mikhail-Kashin/Team-Phobos-TipsyStack)Libraries

TipsyStack uses:

-   [BCrypt](https://github.com/codahale/bcrypt-ruby)  for authorization
-  [Node modules](https://github.com/node-modules) for many dependencies and functionality
- [Express js](https://github.com/expressjs/express) for web framework
- [Morgan](https://github.com/expressjs/morgan) for the http logger middleware for node.js
- [http-errors](https://github.com/jshttp/http-errors) create errors and be able to display them with ease
- [cookie-parser](https://github.com/js-cookie/js-cookie) for cookie parsing in use of cookie storage
- [Sequelize](https://github.com/sequelize/sequelize) for search function

# Challenges

Being the first project on our own there has been some challenges. We welcome them with open arms because it taught us new things as well made use better developer for it

### Search bar

Challenge with apply a search bar was an alien concept we have done queries and use those syntax and commands to create search function. After debate utilize Sequelize Library to create a search function for our website 

    router.post('/',  csrfProtection,  asyncHandler(async  (req, res)  =>  {
    const  { query }  = req.body;
    const questions =  await CocktailQ.findAll({
    include: User,where: {question: {[Op.substring]  :  `%${query}%`},},
    });
    res.render('search',  {questions,csrfToken: req.csrfToken()
	    });
    
    }));
### Voting Feature

Challenge with voting feature is how to properly show the vote count via Ajax. As well making sure user can only vote one time and adapting our values for upvote and downvote is boolean.

You can check the intergration of this "many moving parts" feature with in the file below:
[voteEvents.js](https://github.com/Mikhail-Kashin/Team-Phobos-TipsyStack/blob/main/public/javascripts/voteEvents.js)
[cocktail-q.js](https://github.com/Mikhail-Kashin/Team-Phobos-TipsyStack/blob/main/routes/cocktailq.js)
[index.js](https://github.com/Mikhail-Kashin/Team-Phobos-TipsyStack/blob/main/routes/index.js)

# Future Features 

- Right side-bar containing question index of recent updated question
- Contact Us or about us footer 
-  Implement a more efficient / direct search using regular expressions and be able to search for answer as well.
-  Allow users to comment on questions and answers.
- Post Drink pics in Answer sections.
- Polymophic Up/Down Votes: For Questions, Answers, Comments
- Appy Question Tags System and utilize is as additional way to search for specific subject/catergories base on tag names. 

### Creators/Project

This was project was created with in two week span of March 1st to March 15 in the year of 2021.
First week consisted of planning phased and Second week was for implementing and creating the project.

This project was develop by the following devs:
[Adam Bailey](https://github.com/arb5433)
[Mikhail-Kashin](https://github.com/Mikhail-Kashin)
[Nishi Nelson](https://github.com/nishinelson)
[Tristan San Juan](https://github.com/tristan-88) 

We want to thank our Instructors in [a/A  App Academy](https://github.com/appacademy) for support and help you given team Phoebos
