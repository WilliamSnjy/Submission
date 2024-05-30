import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from "./action";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { receiveThreadsActionCreator } from "../talks/action";
import { receiveUsersActionCreator } from "../users/action";

const fakeThreadsResponse = [
    {
        id: 'thread-1',
        title: 'title 1',
        body: 'body 1',
        createdAt: '2022-09-22T10:06:55.588Z',
    },
];

const fakeUsersResponse = [
    {
        email: 'email-1',
        name: 'name-1',
        password: 'password1',
    },
];

const fakeErrorResponse = new Error('Ups, Something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
    beforeEach(() => {
        api._getAllUsers = api.getAllUsers;
        api._getAllThreads = api.getAllThreads;
    });

    afterEach(() => {
        api._getAllUsers = api.getAllUsers;
        api._getAllThreads = api.getAllThreads;

        delete api._getAllUsers;
        delete api._getAllThreads;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
        api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

        const dispatch = vi.fn();

        await asyncPopulateUsersAndThreads()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
        expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    })

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        api.getAllUsers = () => Promise.reject(fakeErrorResponse);
        api.getAllThreads = () => Promise.reject(fakeErrorResponse);

        const dispatch = vi.fn();

        window.alert = vi.fn();

        await asyncPopulateUsersAndThreads()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    })
});