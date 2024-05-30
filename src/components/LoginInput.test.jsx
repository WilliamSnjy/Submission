import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen} from '@testing-library/react';
import matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";
import LoginInput from "./LoginInput";

expect.extend(matchers);

describe('LoginInput component', () => {
    afterEach(() => {
        cleanup();
    })
    it('should handle email typing correctly', async () => {
        render(<LoginInput login={() => {}}/>);
        const emailInput = await screen.getByPlaceholderText('Email');

        await userEvent.type(emailInput, 'emailtest');

        expect(emailInput).toHaveValue('emailtest');

    });

    it('should handle password typing correctly', async () => {
        render (<LoginInput login={() => {}} />);
        const passwordInput = await screen.findByPlaceholderText('Password');

        await userEvent.type(passwordInput, 'passwordtest');
        
        expect(passwordInput).toHaveValue('passwordtest');
    });

    it('should call login function when login button is clicked', async () => {
        const mockLogin = vi.fn();
        render(<LoginInput login={mockLogin} />);
        const emailInput = await screen.getByPlaceholderText('Email');
        await userEvent.type(emailInput, 'emailtest');
        const passwordInput = await screen.getByPlaceholderText('Password');
        await userEvent.type(passwordInput, 'passwordtest');
        const loginButton = await screen.getByRole('button', {name: 'Login'});

        await userEvent.click(loginButton);

        expect(mockLogin).toBeCalledWith({
            email: 'emailtest',
            password: 'passwordtest',
        });
    });
});