import PropTypes from 'prop-types';

export const languageShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  is_archived: PropTypes.bool.isRequired,
};
