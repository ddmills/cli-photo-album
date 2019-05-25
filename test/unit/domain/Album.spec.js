import { Album } from '../../../src/domain/Album';
import { Photo } from '../../../src/domain/Photo';
import { expect } from 'chai';
import * as random from '../../utility/random';
import sinon from 'sinon';

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

  describe('addPhoto', () => {
    describe('adding a single photo', () => {
      let givenPhoto;

      beforeEach(() => {
        givenPhoto = sinon.createStubInstance(Photo);
        album = new Album();

        album.addPhoto(givenPhoto);
      });

      it('should add the photo to the photos list', () => {
        expect(album.photos).to.include(givenPhoto);
      });

      describe('adding another photo', () => {
        let givenSecondPhoto;

        beforeEach(() => {
          givenSecondPhoto = sinon.createStubInstance(Photo);

          album.addPhoto(givenSecondPhoto);
        });

        it('should have two photos', () => {
          expect(album.photos).to.have.length(2);
        });

        it('should have both photos in the list', () => {
          expect(album.photos).to.deep.equal([givenPhoto, givenSecondPhoto]);
        });
      });
    });
  });
});
