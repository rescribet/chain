# Chain

Proof-of-concept declarative 'programming language' in RDF.

See the apps directory for example applications.

Every application consists of two parts, activation resources and
translation resources.

*Activation resources* define a set of conditions the state must adhere to in
order to evaluate true. When they do, the linked set of translation resources
are marked as active for the cycle.

*Translation resources* define translations in the application state (store).
Once marked for execution, the core will execute contained translations and
write back the added and deleted triples (if any).

The core will terminate once no activation states evaluate true.

## Running
1. Clone the repo
1. `$ npm install`
1. `$ npm run install`
1. `$ python ./server.py`
1. Browse to `http://localhost:8000`
1. Open the console to see the application output.
1. Edit the `application` variable in `src/index.js` to load different
   applications.

Be sure to have [ES6 modules enabled](http://caniuse.com/#feat=es6-module) in
your browser (probably requires setting a flag at the time of writing).
