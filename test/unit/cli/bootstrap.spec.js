import { init } from '../../../src/cli/bootstrap';
import { CLIController } from '../../../src/cli/controllers/CLIController';
import { expect } from 'chai';
import sinon from 'sinon';

describe('bootstrap', () => {
  beforeEach(() => {
    sinon.stub(CLIController, 'interpret');
  });

  describe('init', () => {
    beforeEach(() => {
      init();
    });

    it('should pass the process to the CLI Controller', () => {
      expect(CLIController.interpret).to.have.callCount(1);
      expect(CLIController.interpret).to.be.calledWithExactly(process);
    });
  });
});
