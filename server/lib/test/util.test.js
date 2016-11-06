import { range } from '../util';
import { assert } from 'chai';

describe('util', function() {
	describe('#range', function() {
		it('should return array of length n', function() {
			function checkArray(arr, length) {
				assert(Array.isArray(arr));
				assert(arr.length === length);
			}

			checkArray(range(10), 10);
			checkArray(range(0), 0);
			checkArray(range(-1), 0);
		});
	});
});
