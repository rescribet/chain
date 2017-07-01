import { resolveNode } from '../helpers.js';

export default function onChange(triple, store) {
    const DOMNode = resolveNode(triple.object, store);
    if (typeof DOMNode.value === 'undefined') {
        throw 'Invalid dom node from event selector';
    }
    // Register if not already
    // Get the list of unprocessed events?
    // Return true if match

    // DOMNode.value.addEventListener();
    return false;
}

const listeners = new Map();

export function eventFeature(formula, subj, pred, obj, why) {
    const func = () => {
        console.log('event fired');
    };
    listeners.set(subj, func);
    const DOMNode = resolveNode(obj,  formula);
    if (typeof DOMNode.value === 'undefined') {
        throw 'Invalid dom node from event selector';
    }
    DOMNode.value.addEventListener('input', () => formula.run(),  false);
    return false
}
