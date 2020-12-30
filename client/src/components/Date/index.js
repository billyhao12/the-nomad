import React from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';

const formats = {
  toRelative: dateTime => dateTime.toRelative(),
  default: (dateTime, format) => dateTime.toFormat(format)
}

const Date = ( { date, format = 'toRelative', className, ...props } ) => {

  const classes = [ 'date' ];
  if( className ) classes.push( className );

  const dateTime = DateTime.fromISO(date);

  return (
    <div className={classes.join(' ')} {...props}>
      { formats[format] ? formats[format](dateTime) : formats.default(dateTime, format) }
    </div>
  )

}

Date.propTypes = {
  date: PropTypes.instanceOf(Date),
  format: PropTypes.string,
  className: PropTypes.string,
  props: PropTypes.string
}

export default Date;