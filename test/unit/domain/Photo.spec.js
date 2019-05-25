import { Photo } from '../../../src/domain/Photo';
import { expect } from 'chai';
import * as random from '../../utility/random';

describe('Photo', () => {
  let photo;

  describe('constructor', () => {
    beforeEach(() => {
      photo = new Photo();
    });

    it('should be an instance of Photo', () => {
      expect(photo).to.be.an.instanceOf(Photo);
    });
  });

  describe('create', () => {
    beforeEach(() => {
      photo = Photo.create();
    });

    it('should be an instance of Photo', () => {
      expect(photo).to.be.an.instanceOf(Photo);
    });
  });

  [
    {
      name: 'id',
      setter: 'setId',
      randomizer: random.int,
    },
    {
      name: 'albumId',
      setter: 'setAlbumId',
      randomizer: random.int,
    },
    {
      name: 'title',
      setter: 'setTitle',
      randomizer: random.string,
    },
    {
      name: 'url',
      setter: 'setUrl',
      randomizer: random.url,
    },
    {
      name: 'thumbnailUrl',
      setter: 'setThumbnailUrl',
      randomizer: random.url,
    },
  ].forEach(property => {
    describe(property.setter, () => {
      let givenValue;

      beforeEach(() => {
        givenValue = property.randomizer();
        photo = new Photo();

        photo[property.setter](givenValue);
      });

      it(`should store the ${property.name}`, () => {
        expect(photo).to.have.property(property.name, givenValue);
      });
    });
  });
});
