<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![npm](https://img.shields.io/npm/v/passport-google-oauth20.svg)](https://www.npmjs.com/package/passport-google-oauth20)
[![build](https://img.shields.io/travis/jaredhanson/passport-google-oauth2.svg)](https://travis-ci.org/jaredhanson/passport-google-oauth2)
[![coverage](https://img.shields.io/coveralls/jaredhanson/passport-google-oauth2.svg)](https://coveralls.io/github/jaredhanson/passport-google-oauth2)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="https://9to5google.com/wp-content/uploads/sites/4/2020/01/google_drive_logo.jpg?quality=82&strip=all&w=1600" alt="Logo" width="160" height="80">
  </a>

  <h3 align="center">OAuth2 Authorization with Google Drive API</h3>

  <p align="center">
    SSD Assignment | SLIIT  <img src="https://upload.wikimedia.org/wikipedia/en/a/a6/SLIIT_Logo_Crest.png" alt="Logo" width="20" height="26"> 
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## Project Overview

<img src="https://github.com/thilinijayasekara97/oauth2-authorization-gdrive-api/blob/thilini/screens/home_page.png">

In this project, a client application is created using Node js to authenticate with Google Drive API and to upload images
to the authenticated Google Drive and view images from the google drive. 
Google Drive APIs use the OAuth 2.0 protocol for authentication and authorization. 
The application requests an access token from the Google Authorization Server, extracts a token from the response, 
and sends the token to the Google API that you want to access. 

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [googleapis](https://www.npmjs.com/package/googleapis)
* [Multer](https://www.npmjs.com/package/multer)
* [EJS](https://www.ejs.co/)
* [nodemon](https://www.npmjs.com/package/nodemon)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Before initializing the application you need to setup configuration with your Google account. 
[Google Developers Console](https://console.developers.google.com/). Once you configured the [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent) and [Credentials](https://console.cloud.google.com/apis/credentials) settings you need not enable Google Drive API from library. 
Then your GCP application will be issued a client ID and client secret, which need to be provided to the strategy. dowload the createntials.json file

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/thilinijayasekara97/oauth2-authorization-gdrive-api.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. paste your credentials.json file in root directory

   <img src="https://github.com/thilinijayasekara97/oauth2-authorization-gdrive-api/blob/thilini/screens/project_structure.png">


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

The Google authentication strategy authenticates users using a Google account
and OAuth 2.0 tokens. The client ID and secret obtained when creating an
application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
Google profile.  The `verify` callback must call `cb` providing a user to
complete authentication.

<img src="https://github.com/thilinijayasekara97/oauth2-authorization-gdrive-api/blob/thilini/screens/oauth2_authorization.png">

<img src="https://github.com/thilinijayasekara97/oauth2-authorization-gdrive-api/blob/thilini/screens/oauth2_calbacks.png">


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

