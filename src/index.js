/* global $rdf */
import '../node_modules/rdflib/dist/rdflib.min.js'

import Chain from './chain/chain.js'

window.store = $rdf.graph()
const timeout = 5000
const fetcher = new $rdf.Fetcher(store, timeout)
const application = `${window.location.origin}/apps/counter.ttl`

// Some bootstrapping to get data into the system.
fetcher.nowOrWhenFetched(application, function(ok, body, response) {
    if (!ok) {
        console.log("Oops, something happened and couldn't fetch data")
    } else {
        const dataIn = () => {
            self.chain = new Chain(store)
        }

        $rdf.parse(
          response.body,
          store,
          response.url,
          response.headers.get('Content-Type'),
          dataIn
        )
    }
})
