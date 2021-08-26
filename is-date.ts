export const isDate = ( value: unknown ) => Object.prototype.toString.call( value ) === '[object Date]';
export const anyIsDate = ( ...values: unknown[] ) => values.some( isDate );
