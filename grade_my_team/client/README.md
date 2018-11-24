# Instructions on running/developing the project

## Handling dependencies
In order to setup the client's dependencies, run **npm install** in the **client** directory, which will generate the **node_modules** directory. When commiting any changes, do not also commit the **node_modules** directory.

## Running blockchain test client
Run **testrpc** in order to get the 10 accounts for testing, and keep it running. (Note: to terminate it, normal ^C does not work, so you might have to do ^Z then kill it will kill -9 pid_of_testrpc).


## Setting up metamask
Using the Metamask Chrome extension, setup a custom RPC for "http://localhost:8545", where the testrpc is serving now. Import an account using its private key (testrpc must be running to do that).


## Deploying the contracts
To deploy the contracts, run **truffle migrate --reset**.

## Running the program
To avoid Chrome causing issues, serve the website using the [Web Server for Chrome extension](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en).