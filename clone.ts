import { isDate } from './is-date';
import { isPrimitiveType } from './is-primitive-type';

export const clone = <T> ( value: T ): T => {
	
	if ( !value || isPrimitiveType( value ) ) return value;

	if ( isDate(value) )
		return <T> <unknown> new Date( <Date> <unknown> value );

	if ( Array.isArray( value ) ) return <T> <unknown> value.map( clone );

	const clonedObject: Partial<T> = {};
	for ( const key in value ) clonedObject[ key ] = clone<T[ Extract<keyof T, string> ]>( value[ key ] );

	return <T> clonedObject;
};
