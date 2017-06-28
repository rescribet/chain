/* globals $rdf */

import ActivationProcessor from './ActivationProcessor.js';
import TranslationProcessor from './TranslationProcessor.js';

/**
 * @typedef {Object} Transaction
 * @property {Array<$rdf.Node>} add Triples to be added
 * @property {Array<$rdf.Node>} del Triples to be removed.
 */

/**
 * Chain engine main loop.
 * @param store
 * @constructor
 */
export default function Chain(store = null) {
    if (store === null) {
        store = $rdf.graph();
    }
    let translationsActive = -1;
    let loops = 0;
    while(translationsActive !== 0 && loops <= 100) {
        const aProcessor = new ActivationProcessor(store);
        const tProcessor = new TranslationProcessor(store);
        // Scan for activation statements
        const translationIds = aProcessor.calculateActive();
        translationsActive = translationIds.length;
        // console.log(`Executing translations: ${translationIds}`);
        // Process all activated transitions
        const { add, del } = tProcessor.calculateTranslations(translationIds);
        // console.log(`Statements added: ${add.length}, removed: ${del.length}`);
        // Change writeback
        store = store.remove(del);
        store = store.add(add);
        loops++;
    }
    if (translationsActive === 0) {
        console.log('All applications terminated');
    } else {
        // We'll do this until we have proper mechanics to not hang the system.
        console.log('Execution loop overflow')
    }
}
