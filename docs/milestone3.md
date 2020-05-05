# Documentation
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



# Work Breakdown

**Lakshay Arora** - Created the Mongo Atlas database cluster and initialized collections, and implemented part of the backend database functionality (get, update and put). Implemented Email verification using OTP. Also implemened server-database interaction for User Rating, Login and Sign Up processes.

**Nathan Grant** - Made Flask app for scraping Amazon prices and hosted it on Heroku. Also implemented the jQuery to request the server for prices. Implemented database interaction for searching books.

**Nishad Ranade** - Implemented part of the backend database functionality (getMany and delete), and server-database interaction for the Sell Book, Modify Postings and Account Information. Integrated the Twilio Chat API hosted as a separate app as the messaging feature.