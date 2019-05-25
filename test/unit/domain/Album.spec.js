import { Album } from '../../../src/domain/Album';
import { expect } from 'chai';
import * as random from '../../utility/random';

describe('Album', () => {
  let album;

  describe('constructor', () => {
    beforeEach(() => {
      album = new Album();
    });

    it('should be an instance of Album', () => {
      expect(album).to.be.an.instanceOf(Album);
    });

    it('should have photos', () => {
      expect(album).to.have.deep.property('photos', []);
    });

    it('should have an id', () => {
      expect(album).to.have.property('id', null);
    });
  });

  describe('setId', () => {
    let givenId;

    beforeEach(() => {
      givenId = random.int();
      album = new Album();

      album.setId(givenId);
    });

    it('should store the id', () => {
      expect(album).to.have.property('id', givenId);
    });
  });
});
