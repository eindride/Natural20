/* eslint-disable */

export const stringifyLevel = level => {
  if (parseInt(level, 10) === 0) {
    return 'cantrip';
  }
  if (parseInt(level, 10) === 1) {
    return '1st level';
  }
  if (parseInt(level, 10) === 2) {
    return '2nd level';
  }
  if (parseInt(level, 10) === 3) {
    return '3rd level';
  }
  if (parseInt(level, 10) >= 4) {
    return `${level}th level`;
  }
  return null;
};
