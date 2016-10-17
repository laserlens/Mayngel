#Weekend Challenge 4
- Create a to do list that CRUDs

##What is Happening
  1. On load add all info from the Data Base to the page
  2. On the landing page user can:
    - enter a task to do
      - that task gets added to the to do list the user sees at bottom of page
    - Delete a task thats added
    - click the box next to the task if done:
      - if clicked done:
          - strike a line through the text
          - change the done button blue  and add an X to the text of the button
          - move the done task to the bottom of the list
          - add one Mayngel point
          - can click it from done back to not done then it will reverse the above
  3. On the back end the app does:
    - GETs the table and sends as array of objects to the client.js
    - takes user input as an object and POSTs object info as a new row in the database
    - PUTs mayngelpoints column in the data base for existing row to true(task done) if changed from false(task not done) by user and vise versa
    - DELETEs entire row from database if user clicks remove
