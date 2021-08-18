/*
Usage:
const obj = {
	arr1: [
		{
			innerArr: [ 0, 1, 2, 3 ]
		}
	],
	arr2: [
		{
			innerArr: [ 4, 5, 6, 7 ]
		}
	],
	arr3: [
		{
			innerArr: [ 8, 9, 'A', 'B' ]
		},
		{
			innerArr: [ 'C', 'D', 'E', 'F', { key: 42 } ]
		}
	],
};
console.log( walkThroughObject(obj, 'arr3.innerArr.key') );
*/

const walk = <T> ( result: any, steps: string[] ): T => {
	if ( steps.length === 0 ) return <T> result;
	const step = steps.shift()!;
	return walk( Array.isArray( result ) ? result.flatMap( ( x ) => x[ step ] ).filter(x => x) : result[ step ], steps );
};
export const walkThroughObject = <T> ( object: any, path: string ): T | null => {
	try {
		return walk<T>( object, path.split( '.' ) );
	} catch ( e ) {
		return null;
	}
};
