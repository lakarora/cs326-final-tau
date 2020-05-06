# Documentation
Our MongoDB database named 'PassageDB' has two collections namely 'userInfo and 'bookPostings' which are used by the Passage webapp. The example document for each collection are shown below:  
1. User Information
    
    userInfo document {
        _id: ObjectId('235as0f048y208t'),
        name: Emilia jones // Name of the user
        email: ejones@umass.edu  // Email of the user 
        password: 'd38741379e49acfc91261b0cec2a3f80...ag4' // Hash of user password
        institution: umass // College that the user attends
        username: ejones12  // Chosen Username (alphanumeric only)
        buyerRating: 3.5  // The users buyer rating
        sellerRating: 4.5  // The users seller rating
        numBuyerRatings: 5  // The number of buyer ratings on user
        numSellerRatings: 6  // The number of seller ratings on user

    }
    
2. Collection for Book Postings

    bookPostings document {
         _id: ObjectId('235as0f02ry208t'),
        username: ejones12      // User who posted book
        title: 'Intro to AI'    // Title of the book
        condition: 'new'  // Condition that the book is in
        price: 35.12  // Price of the book 
        amazonPrice: 30.5  // Price of the book on amazon      
        author: 'Henry Collins'   // Author(s) of the book
        ISBN: 'asjbfjo209t94i42t'   // ISBN of the book
        courseNumber: 383,   // Course number that the book is used for
        courseSubject: "Computer Science"  // Course subject of the book
        institution: "umass"     // University that the book was used at
    }



# Work Breakdown

**Lakshay Arora** - Created the Mongo Atlas database cluster and initialized collections, and implemented part of the backend database functionality (get, update and put). Use Google APIs for setting up clientID, clientSecret, and refreshToken for sending emails via nodemailer API (xoauth2 authentication). Implemented account creation feature with OTP verification via email, secure login functionality, and rate other users (buyer rating/seller rating) feature.

**Nathan Grant** - Made Flask app for scraping Amazon prices and hosted it on Heroku. Integrated the price scraping app with Passage when posting a book for sale. Implemented database interaction for searching books.

**Nishad Ranade** - Implemented part of the backend database functionality (getMany and delete), and server-database interaction for the Sell Book, Modify Postings and Account Information. Integrated the Twilio Chat API hosted as a separate app as the messaging feature.