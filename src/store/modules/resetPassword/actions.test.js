import updatePassword from './actions';
import resetPassword from '../../../mocks/user';

const dispatch = jest.fn((action) => action);

describe('Reset password', () => {
    it('should be able to update password', async () => {
        const result = updatePassword(resetPassword) (dispatch);
        expect(result.payload).toEqual(resetPassword);
    });
});