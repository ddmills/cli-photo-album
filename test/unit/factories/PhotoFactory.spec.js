import * as random from '../../utility/random';
import { Photo } from '../../../src/domain/Photo';
import { PhotoFactory } from '../../../src/factories/PhotoFactory';
import { expect } from 'chai';
import sinon from 'sinon';

describe('PhotoFactory', () => {
  beforeEach(() => {
    sinon.stub(Photo, 'create');
  });

  describe('createFromJSON', () => {
    let expectedId,
      expectedAlbumId,
      expectedTitle,
      expectedUrl,
      expectedThumbnailUrl,
      photoInstance,
      result;

    beforeEach(() => {
      expectedId = random.int();
      expectedAlbumId = random.int();
      expectedTitle = random.string();
      expectedUrl = random.url();
      expectedThumbnailUrl = random.url();

      const givenJSON = {
        albumId: expectedAlbumId,
        id: expectedId,
        title: expectedTitle,
        url: expectedUrl,
        thumbnailUrl: expectedThumbnailUrl,
      };

      photoInstance = sinon.createStubInstance(Photo);
      Photo.create.returns(photoInstance);

      result = PhotoFactory.createFromJSON(givenJSON);
    });

    it('should create a photo instance', () => {
      expect(Photo.create).to.have.callCount(1);
      expect(Photo.create).to.be.calledWithExactly();
    });

    it('should return the photo instance', () => {
      expect(result).to.equal(photoInstance);
    });

    it('should set the id', () => {
      expect(photoInstance.setId).have.callCount(1);
      expect(photoInstance.setId).be.calledWithExactly(expectedId);
    });

    it('should set the albumId', () => {
      expect(photoInstance.setAlbumId).have.callCount(1);
      expect(photoInstance.setAlbumId).be.calledWithExactly(expectedAlbumId);
    });

    it('should set the title', () => {
      expect(photoInstance.setTitle).have.callCount(1);
      expect(photoInstance.setTitle).be.calledWithExactly(expectedTitle);
    });

    it('should set the url', () => {
      expect(photoInstance.setUrl).have.callCount(1);
      expect(photoInstance.setUrl).be.calledWithExactly(expectedUrl);
    });

    it('should set the thumbnailUrl', () => {
      expect(photoInstance.setThumbnailUrl).have.callCount(1);
      expect(photoInstance.setThumbnailUrl).be.calledWithExactly(
        expectedThumbnailUrl
      );
    });
  });
});
