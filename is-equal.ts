import { anyIsDate } from "./is-date";
import { isPrimitiveType } from "./is-primitive-type";

type PrimitiveType = string | number | boolean;

const compareValues = ( value1: PrimitiveType, value2: PrimitiveType, compareCase: boolean, compareType: boolean ) =>
	compareCase
		? compareType
			? value1 === value2
			: value1 == value2
		: compareType
			? ( ( <string> value1 ).toLowerCase?.() ?? value1 ) === ( ( <string> value2 ).toLowerCase?.() ?? value2 )
			: ( ( <string> value1 ).toLowerCase?.() ?? value1 ) == ( ( <string> value2 ).toLowerCase?.() ?? value2 );

const compareArrays = ( arr1: unknown[], arr2: unknown[], compareCase: boolean, compareType: boolean ): boolean => {
	const arr1Length = arr1.length;
	const arr2Length = arr2.length;
	if ( arr1Length !== arr2Length ) return false;
	for ( let i = 0; i < arr1Length; i++ )
		if ( !isEqual( arr1[ i ], arr2[ i ], compareCase, compareType ) )
			return false;
	return true;
};

const compareObjects = ( object1: any, object2: any, compareCase: boolean, compareType: boolean ): boolean => {
	if ( Object.keys( object1 ).length !== Object.keys( object2 ).length ) return false;
	for ( const key in object1 )
		if ( !( key in object2 ) || !isEqual( object1[ key ], object2[ key ], compareCase, compareType ) )
			return false;
	return true;
};

export const isEqual = ( value1: any, value2: any, compareCase = true, compareType = true ): boolean => {

	/* Check for null or undefined */
	if ( !value1 || !value2 )
		return compareType
			? value1 === value2
			: value1 == value2;

	/* Check and compare primitive types */
	if ( [ value1, value2 ].some( isPrimitiveType ) )
		return compareValues( value1, value2, compareCase, compareType );
	
	if ( anyIsDate(value1, value2) )
		return ( <Date> value1 ).getTime?.() === ( <Date> value2 ).getTime?.();

	const isValue1Array = Array.isArray( value1 );
	const isValue2Array = Array.isArray( value2 );

	if ( isValue1Array !== isValue2Array ) return false;

	const fnReturn = isValue1Array ? compareArrays : compareObjects;

	/* Check and compare arrays or objects */
	return fnReturn( value1, value2, compareCase, compareType );
};
