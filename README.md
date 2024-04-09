<img src="https://i.ibb.co/sF3Wjg3/bf.jpg" width="100%" height="350" />

## What is Brainflash?

Brainflash is a web application designed to assist users in studying. The application allows for its users to create custom flashcards, categorize them, and build custom decks. It also allows for the creation of review sessions. With these sessions, users can set a start and end date (presumably corresponding with an exam for which they are preparing) and be given a study plan in which they are to study a specified number of flashcards in a day. 

## Setup

This section details how to set up and run the application locally. This requires running two components once the repository is cloned and opened in Visual Studio Code.

### Back End

1. Ensure that a valid mySQL connection is set up on the machine. To download and set up mySQL, visit https://www.mysql.com/downloads/.
2. Once this connection is set up, create a new schema titled "brainflash".
3. Set the User environment variables as follows using your command prompt (parentheses indicate entering information as it relates to your database setup. Omit the parentheses when using the command prompt). This will ensure that the application is able to connect to the mySQL database.
   
     ```
     setx DATABASE_USERNAME (your database username)
     setx DATABASE_PASSWORD (your database password)
     setx DATABASE_URL localhost:3306/brainflash
     ```
5. Open Visual Studio Code and run the BrainflashApplication.java file (located in backend/src/main/java).

### Front End

1. Open a new terminal in Visual Studio Code. Switch to the "frontend" directory.
2. Run the npm install command (shorthand: npm i) to install the necessary dependencies.

```
npm install
```

3. Run npm start. This will start the application's front end. From here, the user can interact with the application.

```
npm start
```

## Usage

This application is intended to be used as a study tool. Create and organize flashcards and utilize the review session (PFE) feature to assist in preparation for upcoming exams!

## Contributing

Contributions are always welcome!

To contibute, .....

## Documentation

This project was built in fulfillment of the requirements of COMP4960 - Software Engineering at Wentworth Institute of Technology. The project documentation is linked below:

1. [Software Requirements Specification](https://docs.google.com/document/d/1cyQBu222I8fotTiqe896mZIxzyaPqb61r9oJhp0OExs)
2. [Software Architecture Proposal](https://docs.google.com/presentation/d/1S7TA-glqRlvQEqpiPnNx5Kg2wIEkKCETkZL7yQBCX1g)
3. [Software Design Document](https://docs.google.com/document/d/1Y0zJFZ67bC232jxLLYDobRx3tckID394)
4. [Project Summary Presentation](https://docs.google.com/presentation/d/1q2AQsnJwyO61aJt6FKezs3wIG5ArATy6UvN5vUTX8ds)
5. Project Overview Video:
6. Project Build and Demo Video:

## License

[MIT](https://choosealicense.com/licenses/mit/)

