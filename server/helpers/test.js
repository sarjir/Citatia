import { expect } from 'chai';

export function verify(result, mocks = []) {
	expect(result).to.not.have.property('errors');

	mocks.forEach((mock) => {
		mock.verify();
	});
}

export default {
	verify
};
