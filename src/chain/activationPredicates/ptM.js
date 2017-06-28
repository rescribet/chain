/**
 * 'Push to make' latching switch activation state. Activates when truthy.
 * @note This was originally intended as a momentary switch, but activation
 *   predicates can't write to the state. An alternative is to preload the store
 *   with an additional activation state which activates a transformation that
 *   writes a falsy into all the ptM references.
 * @returns {string}
 */
export default function ptM(triple) {
    return triple.object;
}
