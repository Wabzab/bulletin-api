# bulletin-board
You have been employed by the National Government to create an inter departmental bulletin
board. The government aims to use this bulletin board to post issues that need to be solved by
more than one department in conjunction. The issues that will be posted here are of a highly
confidential nature – thus this system must:
- Be developed with very strong security;
- Only allow authorized users to utilize the system.

## Setup
Download the zip file for the main branch and unpack anywhere on your computer.
It is recommended to open the folder in an editor such as Visual Studio Code.

### Backend
To setup and run the backend, follow these instructions:
- Navigate to the backend folder using your preferred CLI
- Install the dependancies by running `npm i`
- Start the server by running `npm run dev`
- The server will have started correctly if you see `Connection Success` in the CLI

### Frontend
To setup and run the frontend, follow these instructions:
- Navigate to the frontend folder using your preferred CLI
- Install the dependencies by running `npm i`
- Start the webapp by running `npx ng serve -o --ssl true --ssl-cert '../keys/certificate.pem' --ssl-key '../keys/privatekey.pem'`
- The webapp will have started correctly if you see `Compiled Successfully` in the CLI and the app opened in your browser
