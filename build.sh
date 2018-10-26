set -e

##Installing node.js and npm
brew install node

##Installing the Ethereum test RPC
sudo npm install -g ethereumjs-testrpc

##Installing web3.js
npm install ethereum/web3.js
