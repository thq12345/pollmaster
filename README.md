# Pollmaster

<br>Polling platform<br/>
<br>Author: Fengrui Gan, Felix Chung<br/>

Website for Final Project in [CS5610 Web Development](https://johnguerra.co/classes/webDevelopment_fall_2021/).

## Project Objective

This branch is the branch for final project,
For project 3, checkout the main branch

<br>The objective is to build platform for people to create and to participate in polls<br/>
<br>This should be a React application.<br/>

## Proposal Goals

1. User registration/login.
2. All visitors can use a code to participate a poll
3. Poll maker can create polls with topic/questions and options/answers
4. Each poll will have an expiration time
5. Poll result should be updated automatically.

[Link to landing page](https://poll-master-2.herokuapp.com/)

![Home page of website](/images/main_page_ss.png)
![Demo of poll page](/images/poll_page_ss.png)
![Demo of create poll page](/images/create_poll_ss.png)
![Demo of poll list page](/images/poll_list_ss.png)
![Demo of registration page](/images/registration.png)


## Tech requirements

- The home page should be able to open on most browser
  -Chrome, Firefox, Safari, Internet Explore etc...

## How to Use?
- Registered users create a poll and share the generated link/code to other people.
- During poll creation, user can choose to have the poll to be puiblic or private.
    - public polls are available on the poll list page, private polls can only be access through links
- Users with link can copy and paste link to the browser to join a poll
- User with code can copy and paste the code to the search bar to join a poll

## Instruction to build

- To connect to MongoDB, start your local MongoDB server or create your own .env file that inclode: DB_URL.
- To start back end, run `yarn start` at repo root, the default port for back end server is 3001
- To start front end server, cd into frontend folder and run `yarn start`, the default port for front end server is 3000
- To build project, run `yarn run build` at repo root, the build artifact of react is located in the folder frontend/build
## Database schema
### Poll Schema
- _id: (ObjectId)
- title: String
- options: Array(Object(prompt:String, votes: Int))
- owner: String
- totalVotes: Int
- public : Bool
- createdAt:Double
- ttl: Double
### User Schema
- _id: String
- firstName: String
- lastName: String
- password: String
- createdPolls: Array(ObjectID)
- votedPolls: Object(ObjectID: Int)

## Creator:
### Felix:
  - User login
  - User registration
  - User profile
  - Nav bar
### Simon:
  - Create poll page
  - poll page
  - poll list
  - home page
## [Public Video Demostration](https://youtu.be/9RjcNREjadg)
## [Class Video Demonsrtation](https://www.youtube.com/watch?v=fee3xt_78wA)
## [Slides](https://docs.google.com/presentation/d/1vuoCM38WQt_NlAhMV9_1cfVgfdoTo_Eo/edit?usp=sharing&ouid=114664354331916404538&rtpof=true&sd=true)
