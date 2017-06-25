import ptM from './ptM.js';
import comparison from './comparison.js';
import { OS } from '../namespaces.js';

export default function findEvaluator(name) {
    if (OS('ptM').sameTerm(name)) {
        return ptM;
    } else if (OS('comparison').sameTerm(name)) {
        return comparison;
    } else {
        return undefined;
    }
};
