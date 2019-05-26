import Chance from 'chance';

const chance = new Chance();

export const string = chance.string.bind(chance);
export const int = chance.integer.bind(chance);
export const url = chance.url.bind(chance);
export const d12 = chance.d12.bind(chance);

export const object = () => ({
  [string()]: string(),
});

export const arrayOf = (generator, count = d12()) => {
  return chance.n(generator, count);
};
