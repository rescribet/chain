import { tripleToArgs } from '../helpers.js';
import { OS } from '../namespaces.js';

export const functions = {
    [OS('eq')]: (a, b) => a === b,
    [OS('gt')]: (a, b) => a > b,
    [OS('gte')]: (a, b) => a >= b,
    [OS('lt')]: (a, b) => a < b,
    [OS('lte')]: (a, b) => a <= b,
    [OS('ne')]: (a, b) => a !== b,
};

/**
 * Implements basic comparison operators by deferring them to their javascript
 *   counterparts.
 * @returns {Boolean} Whether the state is true
 */
export default function comparison(triple, store) {
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
