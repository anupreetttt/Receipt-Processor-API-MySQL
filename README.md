# Receipt-Processor-API

## Overview

This repository contains a web service designed to process receipts and calculate points based on predefined rules. The service exposes an API endpoint that accepts JSON-formatted receipts, generating a unique ID for each receipt. This ID can then be used to query the service for the number of points awarded according to specific rules.

## API Specifications

### Endpoint: Process Receipts

- **Path:** /receipts/process
- **Method:** POST
- **Payload:** Receipt JSON
- **Response:** JSON containing a generated ID for the receipt

## IDE:
Visual Studio Code

## Tech Stack used:

1) JavaScript
2) Node Js
3) Express Js

## Prerequisites

Assuming Docker is installed, as mentioned in the instructions

Node and NPM installed, if not, you can download Node from https://nodejs.org/en and run "npm install -g npm" to download latest version of npm

## Getting Started
To run the Receipt Processor, follow these steps:

1) Download the zip file from github or go to desired location in terminal/command prompt and do "git clone https://github.com/anupreetttt/Receipt-Processor-Fetch-Rewards.git"
2) Open Visual Studio Code, File -> Open and navigate to your folder location and click open
3) After that, open VSC terminal and run "npm install" 
4) Install the required dependencies by running the following command: "npm install express body-parser"
5) Once everything is done go to root directory and run the web service by executing "node index.js"

Now, your web service should be running and listening for incoming requests on http://localhost:3000.

To test the API endpoints, you can use a tool like Postman (which I used) or cURL. Here are examples of how to use the endpoints:

To process a receipt, send a POST request to http://localhost:3000/receipts/process with the receipt JSON in the request body. Please refer to the screenshot below:

![Screenshot 2023-06-10 at 5 43 40 PM](https://github.com/anupreetttt/Receipt-Processor-Fetch-Rewards/assets/55594741/c31ff157-15df-4ec5-9c16-2d152d3c2fbc)


To get the points for a receipt, send a GET request to http://localhost:3000/receipts/"your unique ID"/points, where "your unique ID" is the ID returned when processing the receipt, which in the above screenshot is hwx9pp75e. So, request will be sent to http://localhost:3000/receipts/hwx9pp75e/points to get the total points.

![Screenshot 2023-06-10 at 5 44 38 PM](https://github.com/anupreetttt/Receipt-Processor-Fetch-Rewards/assets/55594741/d9f0b563-5f0d-4179-b758-b7ce262c6bb4)
