/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

export const languageShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  is_archived: PropTypes.bool.isRequired,
});
