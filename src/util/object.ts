/**
 * Fast and loose variable cloning with no-linking from source variable
 * 
 * @description Should only be used for non-functional variables, i.e: `arrays`, `objects`, but not `Sets` or `Maps`
 * @param from Variable to replicate
 * @returns a new instance of the object `from`
 */
export function _cloneDeep<Type>(from: Type): Type {
    return JSON.parse(JSON.stringify(from));
}

/**
 * Fast and loose objects content comparator.
 * 
 * @description Note: Ignores order of children and checks nothing but children and their contents.
 * @param x First object to compare with
 * @param y Second object to compare with
 * @returns True if all children of `X` are in `Y` and `Y` has no other children
 */
export function _isObjectEqual( x: object | undefined, y: object | undefined ): boolean{
return JSON.stringify(x) === JSON.stringify(y) 
}


export function isObjectEqual(x: object | undefined, y: object | undefined, maxDepth = 10 ): boolean{
    if (maxDepth <= 0){
        console.log('ABORTED: max depth reached');
        throw new Error("MAX_RECURSION_DEPTH_EXCEEDED");
    }
    console.log(`Searching layers ${maxDepth}`);

    if (!x || !y) return !x && !y;

    let retval = true;

    if (x && y){
        
        // check empty
        if (Object.keys(x).length === 0 && Object.keys(y).length === 0 ) return true;
        // Check divergent lengths
        if (Object.keys(x).length !== Object.keys(y).length){
            return false;
        }

        retval &&= $localCompare(x, y, maxDepth);
    }

    return retval;
}

function $localCompare(x: object, y: object, maxDepth: number): boolean{
    let retval = true;

    if (Array.isArray(x) !== Array.isArray(y)) return false;

    Object.keys(x).forEach((key) => {
        const elementX: any = x[key];
        const elementY: any = y[key];

        const attributeType = typeof elementX;
        if (! elementY || ((typeof elementY) !== attributeType)){
            return false;
        }
        switch (attributeType) {
            case "object":
                // need second pivot here for the sub-classes (Date / Map / Set, etc)
                if (elementX instanceof Map){
                    retval &&= isMapEqual(elementX, elementY, maxDepth - 1);
                } else if (elementX instanceof Set){
                    retval &&= isSetEqual(elementX, elementY, maxDepth - 1);
                } else if (elementX instanceof Date){
                    retval &&= isDateEqual(elementX, elementY, maxDepth - 1);
                }else{
                    retval &&= isObjectEqual(elementX, elementY, maxDepth - 1);
                }
                break;

            case "function":
                retval &&= isFunctionEqual(elementX, elementY, maxDepth - 1);
                break;
        
            default:
                // direct comparison
                retval &&= (elementX === elementY);
                break;
        }
    });

    return retval
}

export function isMapEqual(x: object, y: object, maxDepth: number): boolean {
    if (maxDepth <= 0){
        console.log('ABORTED: max depth reached')
    }

    if (!(x instanceof Map && y instanceof Map)) return false;

    if (x.size != y.size) return false;

    let retval = true;

    const xIter = x.entries();
    const yIter = y.entries();

    for (let i = 0; i < x.size; i++) {
        const xIterValue = xIter.next().value;
        const yIterValue = yIter.next().value;
        retval &&= isObjectEqual(xIterValue, yIterValue, maxDepth - 1);
    }
    

    return retval;
}

export function isSetEqual(x: object, y: object, maxDepth: number): boolean {
    if (maxDepth <= 0){
        console.log('ABORTED: max depth reached')
    }

    if (!(x instanceof Set && y instanceof Set)) return false;

    if (x.size != y.size) return false;

    let retval = true;

    const xIter = x.entries();
    const yIter = y.entries();

    for (let i = 0; i < x.size; i++) {
        const xIterValue = xIter.next().value;
        const yIterValue = yIter.next().value;
        retval &&= isObjectEqual(xIterValue, yIterValue, maxDepth - 1);
    }
    

    return retval;
}

export function isDateEqual(x: object, y: object, maxDepth: number): boolean {
    if (maxDepth <= 0){
        console.log('ABORTED: max depth reached')
    }

    if (!(x instanceof Date && y instanceof Date)) return false;

    return JSON.stringify(x) === JSON.stringify(y);
    // return _isObjectEqual(x,y);
}

export function isFunctionEqual(x: object, y: object, maxDepth: number): boolean {
    if (maxDepth <= 0){
        console.log('ABORTED: max depth reached')
    }

    if (!(typeof x === 'function' && typeof y === 'function')) return false;

    let retval = true;

    retval &&= (x.name === y.name);
    retval &&= (x.length === y.length);
    retval &&= (x.toString() === y.toString());

    return retval;
}
