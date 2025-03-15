## General Idea
The idea of this assignment is to create a “check off” shopping List application.

Think of being in a store with a shopping list that allows you to “check off” the items you’ve already bought, except instead of checking them off, the bought item simply moves to the “Already Bought” list.
Your HTML page should display 2 lists, one titled “To Buy” and the other “Already Bought”.

The “To Buy” list should be pre-populated with a list of at least 5 items. (Hint: Use an array of object literals, where each item will be similar to { name: "cookies", quantity: 10 }) Each shopping list item is to have a name and quantity. It should be displayed to the user in the format of Buy item_quantity item_name. For example, shopping list item { name: "cookies", quantity: 10 } would be listed as Buy 10 cookies.

Next to each item in the list should be a button with the label “Bought”. When the user clicks on the “Bought” button, its associated item should be removed from the “To Buy” list and appear in the “Already Bought” list.

The “Already Bought” list should initially be empty and display a message “Nothing bought yet”. Make sure the message appears only when the list is empty. Once something is “bought” and appears on this list, the format of each item in the list should be Bought item_quantity item_name. For example, the bought item of 10 cookies mentioned before would appear in this list as Bought 10 cookies.

Once the user “buys” every item on the “To Buy” list, i.e., clicks on the “Bought” button for every item in the “To Buy” list, instead of the empty “To Buy” list, display the message “Everything is bought!”

## Rules

Breaking one of these rules will cause you to fail the assignment:
-	You are not allowed to use regular HTML onclick attribute to bind behavior to the button. You must use the AngularJS way of binding behavior.
-	At no point should your Javascript code look up anything in the DOM of the browser.
-	Your implementation should not consist of only 1 controller that does it all: take care of both lists, store the data for both lists, etc.

## Steps

Here is what you will need to do to complete the assignment:
1.	(If you haven’t already) Create a GitHub.com account and a repository that you will use for this class.
2.	(If you haven’t already) Follow the Development Setup Video (beginning of Module 1) instructions on how to create a repository and set it up such that you can host and view your finished web pages on GitHub Pages, i.e., GitHub.io domain name. You will need to provide that URL for your Canvas submission.
3.	Create a folder in your repository that will serve as a container folder for your solution to this assignment. You can call it whatever you want. For example, module7-solution or mod7_solution, etc.
    -	You can do this by ‘cloning’ your repository with git clone https://www.github.com/your_repo_url to your local machine, creating module7-solutionfolder in the root of the repository directory along with a README.txt inside of the module7-solution directory. Then, you would do git add ., followed by git commit -m 'New folder', followed by git push to upload the new folder with the README.txt to the GitHub repository.
4.	HTML/CSS for the assignment
    -	Option 1: Copy the contents of the folder assignment2-starter-code into the newly created folder from the previous step. If you cloned this repository, the assignment 2 folder is located in root_dir_of_your_local_repo/assignments/assignment2/assignment2-starter-code
    -	Option 2: Create the HTML/CSS yourself. Make sure to name the HTML file index.html. The only requirement is that your HTML have the required lists as described in the General Idea section. You can make the lists side by side or one under the other. The rest is up to you.
5.	Import AngularJS into your project and place a `<script>` tag right before the `</body>` tag.
6.	Declare ng-app either on the html or the body element. Name your app ShoppingListCheckOff.
7.	Create app.js in your project and declare an Angular module to match your ng-appdeclaration.
8.	Go back to index.html and declare 2 controllers using controller as syntax. One controller should be called ToBuyController and the other called AlreadyBoughtController. You are required to have 2 controllers for this assignment.
9.	You will obviously need to share data between these controllers. Go back to app.js and implement this data sharing using the singleton approach with the .service declaration. Call the service ShoppingListCheckOffService. Make sure to inject this service into both controllers so they can share data. Also, realize that your service will have to keep track of both ‘to buy’ and ‘bought’ items at the same time. (While there is no one right way to accomplish this functionality, for this assignment, you are required to implement it as described.)
    -	(Hint) You can store 2 separate arrays in the service: one to hold “to buy” items and one to hold “bought” items. The reference to the “to buy” array should be placed/exposed onto the ToBuyController instance as some property. The reference to the “bought” items array should be placed/exposed onto the AlreadyBoughtController instance as some property.
    -	(Hint) When the user clicks on the “Bought” button, simply pass the call from your (ng-click) controller-bound method to call the right method inside of your ShoppingListCheckOffService service, which removes that item from the “to buy” array and pushes it to the “bought” array.
    -	(Hint) Your ShoppingListCheckOffService would also be the place where you would store the initial array of “to buy” items.
10.	To display and/or hide the messages when the list(s) are empty, use the ng-if directive.
11.	To loop over the items in either list use the `ng-repeat` directive.
12.	Make sure all of your Javascript code is inside of an IIFE. (If you don’t know what that is or why we’d want to use it, brush up on it by looking through module 4 of HTML, CSS, and Javascript for Web Developers course I teach.)
13.	Make sure all of your dependency injections are protected from minification.
14.	After you are done and satisfied with your solution, don’t forget to add/commit/push your code to your repository.
15.	In addition to the regular requirements, you will need to implement the following: 
    1. Add another property into each item called pricePerItem. It should be a strictly numeric property. 
    2. Next to each ‘To Buy’ item, display a small textbox that is bound to the quantity property of that item. (Obviously, the initial quantity will be whatever is specified in the value for that item.) 
    3. When the user clicks the ‘Buy’ button, the same behavior as in the original assignment should occur with one difference. The ‘Already Bought’ list should include the “newly bought” item but state Bought item_quantity of item_name for total price of total_price. So, for example, the bought item of 10 cookies at `$2` as pricePerItem would display Bought 10 cookies for total price of `$$$20.00`. (Triple `$` is not a typo, read on.) The total price should NOT be part of the item object, but should be calculated on the fly (and bound to the template). 
    4. The tripple dollar sign for the price is not a typo. It’s the result of the custom filter you are to build and apply to the total price displayed in the template. (We are paying in Angular dollars for this! 🙃😆)

