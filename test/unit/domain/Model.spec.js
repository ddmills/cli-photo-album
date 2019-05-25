import { Model } from '../../../src/domain/Model';
import { expect } from 'chai';

describe('Model', () => {
  describe('create', () => {
    let model;

    beforeEach(() => {
      model = Model.create();
    });

    it('should return an instance of Model', () => {
      expect(model).to.be.an.instanceOf(Model);
    });

    describe('when extended', () => {
      let instance;

      class ModelImplementation extends Model {}

      beforeEach(() => {
        instance = ModelImplementation.create();
      });

      it('should return an instance of both Model and ModelImplementation', () => {
        expect(instance).to.be.an.instanceOf(Model);
        expect(instance).to.be.an.instanceOf(ModelImplementation);
      });
    });
  });
});
