import { Photo } from '../../../src/domain/Photo';
import { Model } from '../../../src/domain/Model';
import { expect } from 'chai';
import * as random from '../../utility/random';

describe('Photo', () => {
  let photo;

  describe('constructor', () => {
    beforeEach(() => {
      photo = new Photo();
    });

    it('should be an instance of Model', () => {
      expect(photo).to.be.an.instanceOf(Model);
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

  describe('toString', () => {
    let expectedId, expectedTitle, result;

    beforeEach(() => {
      expectedId = random.int();
      expectedTitle = random.string();

      photo = Photo.create();

      photo.setId(expectedId);
      photo.setTitle(expectedTitle);

      result = photo.toString();
    });

    it('should output a string with the id and title', () => {
      const parts = ['[', expectedId, ']', ' ', expectedTitle];

      expect(result).to.equal(parts.join(''));
    });
  });
});
