## Title

## Application Name: Passage

## Semester: Spring 2020

## Overview
Passage is a web-based application that students in any of the Five Colleges can use to pass on course textbooks (or other books) to other students in the area. The website is similar to Craigslist, but verifies that the sellers and buyers are indeed students at one of the Five Colleges, and also provides an in-app messaging feature for greater convenience and confidentiality. Potential buyers can message sellers through the app, and arrange to meet up and exchange the books and payments. The application will also incorporate a rating system where the users can rate each other based on their transaction satisfaction. Users can also compare the books on the website to those on Amazon so that they know if they are getting a deal.
## Team Members
* Lakshay Arora - [lakarora](https://github.com/lakarora)
* Nishad Ranade - [nishadranade](https://github.com/nishadranade) 
* Nathan Grant - [N8Grant](https://github.com/N8Grant)

## User Interface

## APIs

## Database
There are two database collections used for Passage implemented in mongoDB. 
1. Collection for User Information
    
    userInformation {

        name: String,  // Name of the user
        email: String, // Email of the user
        password: String, // Password of the user
        institution: String, // College that the user attends
        username: String,  // Chosen Username
        buyerRating: number,  // The users buyer rating
        sellerRating: number,  // The users seller rating
        numBuyerRatings: number,  // The number of buyer ratings on user
        numSellerRatings: number  // The number of seller ratings on user

    }
    
2. Collection for Book Postings

    bookPostings {
        
        user: String,   // User who posted book
        title: String, // Title of the book
        description: String, // Description of the book
        condition: String,  // Condition that the book is in
        seller-rating: float, // Seller rating of the user who posted
        price: float,   // Price of the book 
        amazonPrice: float,  // Price of the book on amazon      
        author: array of Strings ,    // Author(s) of the book
        ISBN: String ,      // ISBN of the book
        courseNumber: String,   // Course number that the book is used for
        courseSubject: String,  // Course subject of the book
        institution: String     // University that the book was used at
    }

## URL Routes/Mappings
* /options/ - Page after successful login, need to be logged in or else you will be returned to the main page
* /createAccount/ - Page accessed from index.html, used to create an account, no permissions needed
* /messages/ - Dashboard for your message feeds, need to be logged in to access it
* /sell/ - Page for creating a book posting, need to be signed in to use it. Can be accessed from options
* /findUser/ - Used to route and get data from database to then display to the user ratings page, need to be logged in
* /rate/ - Used to search a user to rate, need to be logged in to use
* /userRating/ - Used to fetch data from the database about the searched users informaion
* /accountInfo/ - Displays your accounts information such as username, instution, seller rating, and buyer rating
* /checkNewAccount/ - Used to check if a created account alread exists
* /verifyAccount/ - Used to enter in the OTP sent to the new users email
* /MyPostings/ - Used to display the users current postings, need to be logged in to use
* /setPrice/ - Page to set price of a new listing, displays amazon price, need to be logged in to use
* /postBook/ - Page to enter in book information to be posted, need to be logged in to use
* /rateUser/ - Displays username, instution, seller rating, and buyer rating of the searched person. Need to be logged in to use
## Authentication/Authorization

## Division of Labor

## Conclusion

