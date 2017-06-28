import findEvaluator from './translationProcessors/index.js';
import { RDF } from './namespaces.js';

export default class ActivationProcessor {
    constructor (store) {
        if (typeof store === 'undefined' || store === null) {
            throw 'A store must be given';
        }
        this.store = store;
    }

    /**
     * Calculates new data for all given translations.
     * @param translations {Array} IRI's of the translations to process.
     * @returns {Transaction} Triples mutated by all operations in {mutations}.
     */
    calculateTranslations (translations) {
        let add = [];
        let del = [];
        translations.forEach(t => {
            const translation = this.store.match(t);
            const type = this.store.any(t, RDF('type'));
            const { add: tAdd, del: tDel } = findEvaluator(type)(translation, this.store);
            add = add.concat(tAdd);
            del = del.concat(tDel);
        });
        return {
            add,
            del
        };
    }
};
