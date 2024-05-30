import { describe, it, expect} from "vitest";
import usersReducer from "./reducer";

describe('userReducer function', () => {
    it('should return the initial state when given by unknown action', () => {
        const initialState = [];
        const action = { type: 'UNKNOWN'};

        // action
        const nextState = usersReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    })

    it('should return the users when given by RECEIVE_USERS action', () => {
        const initialState = [];
        const action = {
            type: 'RECEIVE_USERS',
            payload: {
                users: [
                    {
                        email: 'email 1',
                        name: 'name 1',
                        password: 'password 1',
                    },
                    {
                        email: 'email 2',
                        name: 'name 2',
                        password: 'password 2',
                    },
                ],
            },
        };

        // action
        const nextState = usersReducer(initialState, action);
        // assert
        expect(nextState).toEqual(action.payload.users);
    })
})