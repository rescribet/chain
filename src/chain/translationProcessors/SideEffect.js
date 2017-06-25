import { tripleToArgs } from '../helpers.js';
import { OS, XMLS } from '../namespaces.js';

/**
 * Translation function which may cause side-effects.
 * @return {Array} Updated state triples.
 * @constructor
 */
export default function SideEffect(translation, store) {
    const tripsAdd = [];
    const tripsDel = [];
    translation.forEach(triple => {
        if (triple.predicate.sameTerm(OS('log'))) {
            console.log(tripleToArgs(triple.object, store));
        } else if (triple.predicate.sameTerm(OS('inc'))) {
            const trip = store.match(triple.object, OS('value'))[0];
            const variable = trip.object;
            if (variable.datatype.sameTerm(XMLS('integer'))) {
                const number = Number.parseInt(variable);
                const next = $rdf.lit(number + 1, null, XMLS('integer'));
                tripsAdd.push($rdf.triple(triple.object, OS('value'), next));
                tripsDel.push(trip);
            }
        }
    });
    return {
        add: tripsAdd,
        del: tripsDel
    };
}
