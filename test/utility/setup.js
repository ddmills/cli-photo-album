import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';

before(() => {
  chai.use(sinonChai);
});

afterEach(() => {
  sinon.restore();
});
