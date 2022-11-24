# COMPS-381F - Server-side Technologies And Cloud Computing (2022 Autumn) Project

## Project Information
Project name: GameDB \
Group Number: 39
| Student Name | SID |
| ------------- | ------------- |
| CHAN HOI WAI  | 12550928 |
| YUEN HON KUEN | 12578476 |
| LAI HO KWONG  | 12782125 |

## Operation guides of server:
* (a) Introduce how to test your Login/Logout pages
* (b) Introduce how to test your CRUD services
* (c) Provide HTTP request types? API? Path URL? Valid login information?
* (d) `README.md` is important to let me know your project functions, which is crucial to mark the grade of your project.

## TESTING ACCOUNT
username: admin
password: admin

## Testing Instruction
1. Visit http://s381f-project-gamedb.herokuapp.com/ by any browser.
2. You should see a login panel. Enter the testing account username and the password to login in the system.
3. After you login the system, there have a list show the game which been recorded. Click one of the game name can show you the details of the game.
4. In the detail page, Edit and Delete buttons has shown at the top-left corner. Also, Back and Home buttons has shown at top-right corner. We can try to click the edit button first.
5. After you press the edit button, server will redirect you to the editing panel. All data will be show at the text box. User can change any data by entering new information into the textbox. 
6. After you change the data, press Update. The page will send a update request to server. If your request successfully handled by server, you will being redirect to the detail page of the game and the data you change will be updated.
7. Press the Delete button to delete a game information. After you deleted the data, you will see the game counter reduced one and the game record being deleted.
8. Click the Create new game data button, it will let you add a new game record.
9. Fill in the required field and click Create. You will see the detail page that the record you create.
10. Press the home button. You will see the game counter updated and the game list showing you record.
11. Press logout button. You will return to the login panel.

## API
We have provided few api to do the CRUD process. And we suggest to use some API testing tools like postman to test the api. Using curl may occur some error that unexpected.

Auth
Login
post /api/login 
Testing Data: {"username": "admin", "password":"admin"}
Sample Usage: 
curl -X POST localhost:8099/api/login -H "Content-Type: application/json" -d '{"username": "admin", "password":"admin"}'
Expect Result:
{
    "message": "Success"
}

Logout
get /api/Logout
Sample Usage: 
curl localhost:8099/api/logout
Expect Result:
{
    "message": "Logged Out"
}

Create
post /api/inventory/create
Sample Usage:
curl -X POST -H "Content-Type: application/json" --data '{
    "name": "Grand Theft Auto V",
    "type": "Game",
    "description": "Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.",
    "developer": "Rockstar North",
    "publisher": "Rockstar Games",
    "os": {
        "windows": true,
        "macos": false,
        "linux": false
    },
    "releaseDateAt": "2015-04-13T23:00:00.000Z",
    "lastUpdateAt": "2022-11-11T17:32:57.000Z",
    "lastUpdateBy": "admin",
    "photo": null,
    "photo_mimetype": null
}' http://s381f-project-gamedb.herokuapp.com/api/create


Get List
get /api/inventory/list
Sample Usage:
curl localhost:8099/api/inventory/list
Expect Result:
Return all data

Get Record By Name
get /api/inventory/name/:name 
Testing Data: Dota 2
Sample Usage:
curl localhost:8099/api/inventory/name/Dota%202
Expect Result:
[
    {
        "_id": "6375f1bd7473690cb772cd37",
        "name": "Dota 2",
        "type": "Game",
        "description": "Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes. And no matter if it's their 10th hour of play or 1,000th, there's always something new to discover. With regular updates that ensure a constant evolution of gameplay, features, and heroes, Dota 2 has taken on a life of its own.",
        "developer": "Valve",
        "publisher": "Valve ",
        "os": {
            "windows": true,
            "macos": true,
            "linux": true
        },
        "releaseDateAt": "2013-07-09T17:00:00.000Z",
        "lastUpdateAt": "2022-11-18T17:59:49.053Z",
        "lastUpdateBy": "admin",
        "photo": 
        "photo_mimetype": "image/jpeg"
    }
]

Get Record By Type
get /api/inventory/type/:type
Sample Usage: 
curl localhost:8099/inventory/type/game
Expect Result:
Listing all game which type is game

Update Record
post /api/inventory/edit/:id
Sample Usage:
curl -X POST -H "Content-Type: application/json" -d 
{
      "name":"Grand Theft Auto V",
      "type":"Game",
      "description":"Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.",
      "developer":"Rockstar North",
      "publisher":"Rockstar Games",
      "os" : {
         "windows" : true,
         "macos" : false,
         "linux" : false
      },
      "releaseDateAt":"2015-04-13T23:00:00.000Z",
      "lastUpdateAt":"2022-11-11T17:32:57.000Z",
      "lastUpdateBy": "admin",
      "photo":null,
      "photo_mimetype":null
   } 
   localhost:8099/api/inventory/edit/6375f1bd7473690cb772cd37
Expect Result:
{
    "message": "Success"
}

Remove Record
get /api/inventory/delete/:id
Sample Usage:
curl localhost:8099/api/inventory/delete/6375f1bd7473690cb772cd37
Expect Result:
{
    "message": "Success"
}