import sinon from 'sinon';
import { expect } from 'chai';
import user from '../models/user';

const UserModel = user();

describe('Get all users', function () {
	it('should return all users', function (done) {
		const UserModelMock = sinon.mock(UserModel);

		UserModelMock.expects('find').yields(null, {
			status: true,
			usersoeu: []
		});

		UserModel.find(function(err, result) {
			UserModelMock.verify();
			UserModelMock.restore();
			expect(result.status).to.be.true;
			done();
		});
	});
});
