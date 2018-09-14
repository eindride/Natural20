import { firebase } from './firebase/index';

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

export const getProfiencyBonus = level => {
  if (level <= 4) {
    return 2;
  }
  if (level <= 8) {
    return 3;
  }
  if (level <= 12) {
    return 4;
  }
  if (level <= 16) {
    return 5;
  }
  return 6;
};

export const isAdmin = uid =>
  new Promise(resolve => {
    const { db } = firebase;
    db.collection('users')
      .doc('admin')
      .get()
      .then(doc => {
        resolve(doc.data().userId === uid);
      })
      .catch(error => {
        console.log({ error });
      });
  });
