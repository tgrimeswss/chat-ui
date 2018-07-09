# Spot.IM Chat Application

### To run this application

(PLEASE HAVE NODE INSTALLED ON YOUR OPERATING MACHINE!!! Visit nodejs.org)
- Download this git 
- Change into the proper downloaded directory on your local
machine
- Then run the following commands

1. **npm install** (Will install all node packages to run the application)
2. **npm run start** (Will boot the applicaiton and host it on local port 3000)


### Purpose
The purpose of this application is to create a live chat environment through the use
of an open web socket. It is designed and produced for the final code test submission
for Thomas Grimes at Spot.IM.

Each user is prompted to create a fake username before beginning
the chat application. (For the purpose of this demo, the username is stored locally
in a reducer supplied by the Redux & React-Redux node package. The modal state is
then toggled if there is indeed a username registered to the username reducer.)

### User experience
Users have the ability to customize their text message by simply highlighting the
pre-sent message. A popup modal will apear with options for editing the text style 
to their liking. This has been created through the ReactQuill node package. The state 
of the message will clear upon submission as per the instructions of the assignment.

When there is an interrupted connection to the socket, a loading module with toggle
based on the status of the execution.

### User interface
As for styling, all styles have been adopted by the global style sheet labelled
index.scss to promote a single parsing of styles at application launch as well utilzing the
following styling packages 

- Semantic UI React for the components
- React Bootstrap for the layout

There is a dummy 'unknown' avatar image for each username avatar.
