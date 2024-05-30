import { describe, it, expect } from "vitest";
import threadsReducer from "./reducer";

describe('threadReducer function', () => {
    it('should return the initial state when given by unknown action', () => {
        // arrange
        const initialState = [];
        const action = { type: 'UNKNOWN'};

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    })

    it('should return the threads when given by RECEIVE_THREADS action', () => {
        const initialState = [];
        const action = {
            type: 'RECEIVE_THREAD',
            payload: {
                threads: [
                    {
                        id: 'threads-1',
                        title: 'Title Test 1',
                        body: 'Body Test 1',
                        createdAt: '2022-09-22T10:06:55.588Z',
                    },
                    {
                        id: 'threads-2',
                        title: 'Title Test 2',
                        body: 'Body Test 2',
                        createdAt: '2022-09-22T10:06:55.588Z',
                    },
                ],
            },
        };
        // action
        const nextState = threadsReducer(initialState, action);
        // assert
        expect(nextState).toEqual(action.payload.threads);
    })

    it('should return the threads with the new thread when given by ADD_THREAD action', () => {
        const initialState = [
            {
                id: 'thread-1',
                title: 'title test 1',
                body: 'body test 1',
                createdAt: '2022-09-22T10:06:55.588Z',
            },
        ];

        const action = {
            type: 'ADD_THREAD',
            payload: {
                thread: {
                    id: 'thread-2',
                    title: 'title test 2',
                    body: 'body test 2',
                    createdAt: '2022-09-22T10:06:55.588Z',
                },
            },
        };

        const nextState = threadsReducer(initialState, action);
        expect(nextState).toEqual([action.payload.thread, ...initialState]);
    })
})
