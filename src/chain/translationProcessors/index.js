import SideEffect from './SideEffect.js';
import { OS } from '../namespaces.js';

export default function findEvaluator(name) {
    if (OS('SideEffect').sameTerm(name)) {
        return SideEffect;
    } else {
        return undefined;
    }
};
