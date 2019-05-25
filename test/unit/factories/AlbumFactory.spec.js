import * as random from '../../utility/random';
import { Album } from '../../../src/domain/Album';
import { Photo } from '../../../src/domain/Photo';
import { AlbumFactory } from '../../../src/factories/AlbumFactory';
import { PhotoFactory } from '../../../src/factories/PhotoFactory';
import { expect } from 'chai';
import sinon from 'sinon';

describe('AlbumFactory', () => {
  beforeEach(() => {
    sinon.stub(Album, 'create');
    sinon.stub(PhotoFactory, 'createFromJSON');
  });

  describe('createFromJSON', () => {
    let givenId, givenPhotoJSONArray, expectedPhotos, albumInstance, result;

    beforeEach(() => {
      givenId = random.int();

      givenPhotoJSONArray = random.arrayOf(random.object);

      expectedPhotos = givenPhotoJSONArray.map(photoJSON => {
        const photo = sinon.createStubInstance(Photo);

        PhotoFactory.createFromJSON.withArgs(photoJSON).returns(photo);

        return photo;
      });

      albumInstance = sinon.createStubInstance(Album);
      Album.create.returns(albumInstance);

      result = AlbumFactory.createFromJSON(givenId, givenPhotoJSONArray);
    });

    it('should create an album instance', () => {
      expect(Album.create).to.have.callCount(1);
      expect(Album.create).to.be.calledWithExactly();
    });

    it('should return the album instance', () => {
      expect(result).to.equal(albumInstance);
    });

    it('should set the id', () => {
      expect(albumInstance.setId).have.callCount(1);
      expect(albumInstance.setId).be.calledWithExactly(givenId);
    });

    it('should create a photo for every photoJSON', () => {
      expect(PhotoFactory.createFromJSON).to.have.callCount(
        givenPhotoJSONArray.length
      );

      givenPhotoJSONArray.forEach(photoJSON => {
        expect(PhotoFactory.createFromJSON).to.be.calledWithExactly(photoJSON);
      });
    });

    it('should add each photo to the album', () => {
      expect(albumInstance.addPhoto).to.have.callCount(expectedPhotos.length);

      expectedPhotos.forEach(photo => {
        expect(albumInstance.addPhoto).to.be.calledWithExactly(photo);
      });
    });
  });
});
