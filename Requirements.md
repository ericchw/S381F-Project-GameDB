A. Requirements (Total score: 100 marks)

    1: Development Technologies and Formats (10 marks)
      (a) Use the web framework - Express based on Node.js. 
      (b) Use the cloud platform to run your app, i.e., IBM Cloud, AWS, Heroku, Microsoft Azure, etc. 
      (c) Use EJS templates to render all UI or write your own UI codes. 
      (d) Use MongoDB driver or Mongoose or just allocate program variables to manage your database.

      All of your app files are put in a folder named “S381F-Project-<your project name>”. Inside your app folder, all files follow the structure:
        S381F-Project-<your project name> 
            |___ server.js 
            |___ package.json 
            |___ public 
                |___ “your static contents/resources” 
            |___ views 
                |___ “.ejs templates” 
            |___ models 
                |___ “data schema files” 
            |___ README.md 
                |___ “project name, group information (student name and SID), operation guides of your server”

       Notes: - The files `server.js`, `package.json`, and `README.md` are compulsory. - The folders `public`, `views`, and `models` are optional, depending on your program.

    2: Functional Requirements (90 marks)
      (a) The server provides Login/Logout pages for users (20 marks)
          • Each user account had a userid and password 
          • Upon successful login, userid should be stored in a session 
      (b) The server provides basic CRUD services for your app. (40 marks)
          • The user can create new data objects or documents (in MongoDB).
          • The user can update data objects or documents. • The user can delete inventory documents.
          • The user can search data by some query conditions.
      (c) The server provides RESTful services. (20 marks) 
          • Provide API (path URL) to handle HTTP requests 
          • Design different API for serving different CRUD operations. 
      (d) Write operation guides in ` README.md ` to help users quickly learn how to use the above services. (10 marks) 
          • Introduce how to test your Login/Logout pages 
          • Introduce how to test your CRUD services 
          • Provide HTTP request types? API? Path URL? Valid login information? 
          • `README.md` is important to let me know your project functions, which is crucial to mark the grade of your project.



B. Submission Notes
    One submission per group. Each submission includes two items: 
        1. A web server URL that runs your app in a cloud platform.
            • Record your app URL in the google form: https://docs.google.com/spreadsheets/d/17iNkvAgUBJ7nTB-LgLcbQzztJlHl2ltXDzCfZAbBTy0/edit?usp=sharing
        2. A folder “S381F-Project-<your project name>” that includes all of your app files.
            • Package this folder as a zip file and submit it to the OLE.
            • At least one student in your group needs to upload the zip file.
            
    Submission Deadline: 24 Nov., 2022 (Thursday)
    
    Notes:
    - You are encouraged to submit at least one day before the deadline, so that you have sufficient time to deal with submission problems and other unexpected issues.
    - After submission, please re-enter the submission page to verify the submission status again.
    - Re-submission in OLE before the deadline, within the limitations of the OLE multiple submission function, is allowed.



C. Scoring
    1. A project’s score is deducted in case of incomplete source codes / functions (according to the requirements).
    2. All students in a group will get the same score, depending on the score of your group project.
