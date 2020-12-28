import React from 'react';
import { DateTime } from 'luxon';
// import PropTypes from 'prop-types';

const formats = {
  toRelative: dateTime => dateTime.toRelative(),
  default: (dateTime, format) => dateTime.toFormat(format)
}

// eslint-disable-next-line react/prop-types
const Date = ( { date, format = 'toRelative', className, ...props } ) => {

  const classes = [ 'date' ];
  if( className ) classes.push( className );

  const dateTime = DateTime.fromISO(date);

  return (
    <span className={classes.join(' ')} {...props}>
      { formats[format] ? formats[format](dateTime) : formats.default(dateTime, format) }
    </span>
  )

}

// TBD
// Date.propTypes = {
//     date: PropTypes.
// }

export default Date;