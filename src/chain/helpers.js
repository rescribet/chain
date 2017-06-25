import { OS, XMLS } from './namespaces.js';

function processNode(node, store) {
    if (node.termType === 'NamedNode') {
        return processNode(store.any(node, OS('value')), store);
    } else if(node.termType === 'Literal') {
        return node.datatype.sameTerm(XMLS('integer'))
            ? Number.parseInt(node.value)
            : node.value;
    } else {
        console.log('unkown type in arg eval');
    }
}

/**
 * Converts a triple to passable function arguments,
 *   mainly by trying to resolve the underlying value.
 * @param triple
 * @param store
 * @returns {*}
 */
export function tripleToArgs(triple, store) {
    if (Array.isArray(triple.elements)) {
        return triple.elements.map(e => processNode(e, store));
    }
    return processNode(triple, store);
}
