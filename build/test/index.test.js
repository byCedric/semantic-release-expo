"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('index', () => {
    it('exports prepare method', () => expect(src_1.prepare).toBeInstanceOf(Function));
    it('exports verifyConditions method', () => expect(src_1.verifyConditions).toBeInstanceOf(Function));
});
//# sourceMappingURL=index.test.js.map