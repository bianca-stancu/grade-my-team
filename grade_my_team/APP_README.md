To run the application follow these steps:

0. Add empty folders "data" and "assignments" in the root directory

1. In a new terminal run "mongod --dbpath=./data"

2. In an other terminal : "node seed.js" ----> To seed the database

3. then run "npm install" and "npm run dev"

4. If you want to check the database content, open a third terminal and type "mongo". Then to see the active databases
   type "show dbs".
   To watch the content of our database type "use dsproject". To see its collections type "db.getCollectionNames()" and
   to see the content of a collection type "ds.collection_name.find()"

Notes:
- The database is permanent, so even if you turn of the server you don't lose its content.
  To empty the database you should remove the content of data folder.