export const utilService = {
  makeId,
  getRandomInt,
  getRandomUniversity,
};

function makeId(length = 6) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomUniversity() {
  const universities = [
    'Harvard University',
    'University of Cambridge',
    'Columbia University',
    'University of Oxford',
    'Yale University',
    'Stanford University',
    'Princeton University',
  ];
  return universities[getRandomInt(0, universities.length)];
}
