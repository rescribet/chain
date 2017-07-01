import comparison from './comparison.js';
import onChange from './eventListeners.js';
import ptM from './ptM.js';
import { OS } from '../namespaces.js';

export default function findEvaluator(name) {
    if (OS('ptM').sameTerm(name)) {
        return ptM;
    } else if (OS('comparison').sameTerm(name)) {
        return comparison;
    } else if (OS('onChange').sameTerm(name)) {
        return onChange;
    } else {
        return undefined;
    }
};
