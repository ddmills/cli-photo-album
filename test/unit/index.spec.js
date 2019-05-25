import { expect } from 'chai';
import { init } from '../../src/index';

describe('index', () => {
  describe('init', () => {
    it('should return "hello"', () => {
      const result = init();

      expect(result).to.equal('hello');
    });
  });
});
