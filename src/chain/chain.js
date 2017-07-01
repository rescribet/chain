/* globals $rdf */

import ActivationProcessor from './ActivationProcessor.js';
import TranslationProcessor from './TranslationProcessor.js';
import { OS } from './namespaces.js';

import { eventFeature } from './activationPredicates/eventListeners.js'

/**
 * @typedef {Object} Transaction
 * @property {Array<$rdf.Node>} add Triples to be added
 * @property {Array<$rdf.Node>} del Triples to be removed.
 */

function run() {
    const aProcessor = new ActivationProcessor(this);
    const tProcessor = new TranslationProcessor(this);
    // Scan for activation statements
    const translationIds = aProcessor.calculateActive();
    // console.log(`Executing translations: ${translationIds}`);
    // Process all activated transitions
    const { add, del } = tProcessor.calculateTranslations(translationIds);
    // console.log(`Statements added: ${add.length}, removed: ${del.length}`);
    // Change writeback
    this.remove(del);
    this.add(add);
    return translationIds.length;
}

/**
 * Chain engine main loop.
 * @param store
 * @constructor
 */
export default function Chain(store = null) {
    if (store === null) {
        store = $rdf.graph();
        store.propertyActions[OS('onChange')] = eventFeature;
    }
    if (typeof store.run === 'undefined') {
        store.run = run;
    }
    let translationsActive = -1;
    let loops = 0;
    while(translationsActive !== 0 && loops <= 1000) {
        // translationsActive = run(store);
        translationsActive = store.run();
        loops++;
    }
    if (translationsActive === 0) {
        console.log('All applications terminated');
    } else {
        // We'll do this until we have proper mechanics to not hang the system.
        console.log('Execution loop overflow')
    }
}
