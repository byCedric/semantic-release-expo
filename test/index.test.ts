import { prepare, verifyConditions } from '../src';

describe('index', () => {
	it('exports prepare method', () => expect(prepare).toBeInstanceOf(Function));
	it('exports verifyConditions method', () => expect(verifyConditions).toBeInstanceOf(Function));
});
