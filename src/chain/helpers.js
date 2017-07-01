import { OA, OS, RDF, XMLS } from './namespaces.js';

const currentDocument = $rdf.namedNode(document.location.href);

/**
 * Implements value extraction for various types of resources.
 */
function resolveNamedNodeByType(node, type, store) {
    if (OA('ResourceSelection').sameTerm(type)) {
        // Try to extract the value
        if (!currentDocument.sameTerm(store.any(node, OA('hasSource')))) {
            throw 'Fetching external documents not yet supported';
        }
        const selectorId = store.any(node, OA('hasSelector'));
        if (!selectorId) {
            throw 'Selector not given for query';
        }
        const selectorType = store.any(selectorId, RDF('type'));
        if (!(selectorType && selectorType.sameTerm(OA('CssSelector')))) {
            throw 'Selector not present or supported';
        }
        const selectorValue = store.any(selectorId, RDF('value'));
        if (!(selectorType && selectorType.sameTerm(OA('CssSelector')))) {
            throw 'Selector has no value';
        }
        const elements = document.querySelectorAll(selectorValue.value);
        if (elements.length === 1) {
            return $rdf.literal(elements[0], OS('DOMNode'));
        }
        const results = [];
        for (let node of elements) {
            results.push($rdf.literal(node, OS('DOMNode')));
        }
        return results;
    } else if (store.any(node, RDF('value'))) {
        // TODO: don't do this twice.
        return store.any(node, RDF('value'));
    }
    throw 'Error while trying to resolve value';
}

export function resolveNode(node, store) {
    if (node.termType === 'NamedNode') {
        const types = store.each(node, RDF('type'));
        for (let type of types) {
            let result = resolveNamedNodeByType(node, type, store);
            if (result) {
                return result;
            }
        }
        return resolveNamedNodeByType(node, null, store);
    } else if(node.termType === 'Literal') {
        return node;
    } else {
        console.log('unkown type in arg eval');
    }
}

function resolveUntilPrimitive(node, store) {
    const resolved = resolveNode(node, store);
    if (node.termType === 'Literal') {
        if (OS('DOMNode').sameTerm(node.datatype)) {
            switch (node.value.nodeName) {
                case 'INPUT':
                    return node.value.value;
                default:
                    return node.value.innerHTML;
            }
        }
        return XMLS('integer').sameTerm(node.datatype)
            ? Number.parseInt(node.value)
            : node.value;
    }
    return resolveUntilPrimitive(resolved, store);
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
        return triple.elements.map(e => resolveUntilPrimitive(e, store));
    }
    return resolveUntilPrimitive(triple, store);
}
