import findEvaluator from './activationPredicates/index.js';
import { OS, RDF } from './namespaces.js';

const ACTIVATION_PREDICATES = [OS('ptM'), OS('comparison'), OS('onChange')];

export default class ActivationProcessor {
    constructor(store) {
        if (typeof store === 'undefined' || store === null) {
            throw 'A store must be given';
        }
        this.store = store;
    }

    /**
     * Determines which translation states evaluate true based on the activation
     *   states.
     * @returns {Array} IRI's of all the activated translations
     */
    calculateActive() {
        const activationIds = this.store.match(
            null,
            RDF('type'),
            OS('ActivationState')
        ).map(t => t.subject);

        const translationIds = [];
        activationIds.forEach(id => {
            ACTIVATION_PREDICATES.forEach(p => {
                const predicateActivations = this.store.match(id, p);
                const evaluator = findEvaluator(p);
                predicateActivations.forEach(pA => {
                    if (evaluator(pA, this.store)) {
                        this.store.match(id, OS('activates'))
                            .forEach(t => translationIds.push(t.object));
                    }
                });
            });
        });
        return translationIds;
    }
};
