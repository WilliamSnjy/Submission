import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { asyncAddThread, addThreadActionCreator } from "./action";
import api from "../../utils/api";

const fakeAddResponse = [
    {
        title: 'title 1',
        body: 'body 1',
    },
];

const fakeErrorResponse = new Error('Ups, Something went wrong');

describe('asyncAddThread thunk', (title, body) => {
    beforeEach(() => {
        api._createThread = api.createThread;
    });


    afterEach(() => {
        api._createThread = api.createThread;

        delete api._createThread;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        api.createThread = () => Promise.resolve(fakeAddResponse);

        const dispatch = vi.fn();

        await asyncAddThread(title, body)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeAddResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    })

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        api.createThread = () => Promise.reject(fakeErrorResponse);

        const dispatch = vi.fn();

        window.alert = vi.fn();

        await asyncAddThread(title, body)(dispatch);
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    })
})