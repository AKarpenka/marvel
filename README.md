# ⭐ Marvel Information Portal
Information portal about Marvel characters and comics. 
### From the user's point of view:
**On the Characters tab you can:**
- get a random character, as well as learn more about him by clicking on the 'Homepage' or 'Wiki' links;
- get a list of characters in the form of cards, by clicking on which you can find out more detailed information: links to more detailed information, a short description and a list of comics in which this character is present;
- if you need to get more characters than 9, there is a 'load more' button at the bottom;
- filter characters by name and find the right one, for this there is a field 'find a character by name'.

**On the Comics tab you can:**
- see the full list of comics with title and price, and download more comics if needed;
- choose one of the comics and go to the page with more detailed information about it.

### Technical information:
- React.js is based on functional components.
- The application implements lazy loading for loading characters or comics.
- For searching, the Formik and Yup library is used for more convenient validation of the entered data. 
- The react-helmet library is used for more convenient work with head.
- A service has been implemented to work with the open marvel api, with which you can get information about marvel.

**Try it:** https://marvel-info-sk.vercel.app

`ReactJS`  `Sass`  `Formik`  `Yup`  `React-Helmet`  `Lazy loading`  `Open API`  

# Preview 
<p align="center">
  <img src="public/marvel.gif" width="700"/>
</p>

# How to install 
1. Clone the repository:
```cmd
YourFolderName > git clone git@github.com:AKarpenka/marvel.git
```

2. Install npm packages for the client:
```cmd
marvel > npm i
```

# How to run 
```cmd
marvel > npm run start
```

<sub>Made in 2023</sub>
