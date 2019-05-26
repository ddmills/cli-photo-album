import * as Logger from '../../../../src/cli/utility/Logger';
import * as random from '../../../utility/random';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Logger', () => {
  beforeEach(() => {
    sinon.spy(console, 'log');
  });

  describe('log', () => {
    let args;

    beforeEach(() => {
      args = random.arrayOf(random.string);

      Logger.log(...args);
    });

    it('should use the console to log the args', () => {
      expect(console.log).to.have.callCount(1);
      expect(console.log).to.be.calledWithExactly(...args);
    });
  });
});
