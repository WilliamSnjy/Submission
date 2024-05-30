import { describe, it, expect, afterEach, vi } from "vitest";
import RegisterInput from "./RegisterInput";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers)

describe('RegisterInput component', () => {
    afterEach(() => {
        cleanup();
    })
    it('should handle name typing correctly', async () => {
        render(<RegisterInput register={() => {}}/>);
        const nameInput = await screen.getByPlaceholderText('Name');
        
        await userEvent.type(nameInput, 'nametest');

        expect(nameInput).toHaveValue('nametest');
    });

    it('should handle email typing correctly', async () => {
        render(<RegisterInput register={() => {}} />);
        const usernameInput = await screen.getByPlaceholderText('Username');

        await userEvent.type(usernameInput, 'usernametest');

        expect(usernameInput).toHaveValue('usernametest');
    });

    it('should handle password typing correctly', async () => {
        render(<RegisterInput register={() => {}} />);
        const passwordInput = await screen.getByPlaceholderText('Password');

        await userEvent.type(passwordInput, 'passwordtest');

        expect(passwordInput).toHaveValue('passwordtest');
    });

    it('should call register function when register button is clicked', async () => {
        const mockRegister = vi.fn();
        render(<RegisterInput register={mockRegister} />);
        const nameInput = await screen.getByPlaceholderText('Name');
        await userEvent.type(nameInput, 'nametest');
        const usernameInput = await screen.getByPlaceholderText('Username');
        await userEvent.type(usernameInput, 'usernametest');
        const passwordInput = await screen.getByPlaceholderText('Password');
        await userEvent.type(passwordInput, 'passwordtest');
        const registerButton = await screen.getByRole('button');

        await userEvent.click(registerButton);

        expect(mockRegister).toBeCalledWith({
            name: 'nametest',
            email: 'usernametest',
            password: 'passwordtest',
        });
    });
});