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

TESTING ACCOUNT
username: admin
password: admin

Testing Instruction
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

