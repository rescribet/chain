import { tripleToArgs } from '../helpers.js';
import { OS, XMLS } from '../namespaces.js';

export const functions = {
    [OS('gt')]: (a, b) => a > b,
    [OS('gte')]: (a, b) => a >= b,
    [OS('lt')]: (a, b) => a < b,
    [OS('lte')]: (a, b) => a <= b,
};

export default function ptM(triple, store) {
    if (typeof functions[triple.object] === 'function') {
        const args = store.any(triple.subject, OS('args'));
        if(typeof args === 'undefined') {
            console.error('Arguments must be given to run a function');
            return false;
        }
        return functions[triple.object](...tripleToArgs(args, store))
    }
    return false;
}
