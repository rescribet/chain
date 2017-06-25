/* global $rdf */
import '../node_modules/n3/browser/n3-browserify.js';
import Chain from './chain/chain.js';

window.store = $rdf.graph();
const timeout = 5000;
const fetcher = new $rdf.Fetcher(store, timeout);
const application = 'http://localhost:8000/apps/helloworld.ttl';

// Some bootstrapping to get data into the system.
fetcher.nowOrWhenFetched(application, function(ok, body, xhr) {
    if (!ok) {
        console.log("Oops, something happened and couldn't fetch data");
    } else {
        function dataIn() {
            self.chain = new Chain(store);
        }

        $rdf.parse(
            xhr.body,
            store,
            xhr.responseURL,
            xhr.getResponseHeader('Content-Type'),
            dataIn
        );
    }
});
