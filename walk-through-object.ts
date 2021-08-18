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
