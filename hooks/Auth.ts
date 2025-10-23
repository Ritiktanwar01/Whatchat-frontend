import { storage } from "../app/utils/MMKVSetup";
import { API_BASE_URL } from "./ServerConf";


let lastCallTime: number | null = null;

export const Signup = async ({ email }: { email: string }) => {
    const now = Date.now();

    if (lastCallTime && now - lastCallTime < 4000) {
        return { success: false, error: 'Debounced: Please wait before retrying.' };
    }

    lastCallTime = now;

    try {
        const response = await fetch(`${API_BASE_URL}/SendOtp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        return { res: data, status: data.status };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
};


export const VerifyOTP = async ({ email, otp }: { email: string, otp: string }) => {
    try {

        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, OTP: otp }),
        });

        if (!response.ok) {
            const data = await response.json();
            // console.log(data);
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        const now = new Date().toISOString();



        if (data.login === true) {
            if (data.mobile) {
                storage.set('auth', JSON.stringify({
                    loginState: data.login,
                    access_token: data.Access_token,
                    access_token_created_at: now,
                    refresh_token: data.Refresh_token,
                    refresh_token_created_at: now,
                    mobile: data.mobile,
                }));

                return { screen: 'ProfilePic', login: true }
            }
            storage.set('auth', JSON.stringify({
                loginState: data.login,
                access_token: data.Access_token,
                access_token_created_at: now,
                refresh_token: data.Refresh_token,
                refresh_token_created_at: now,
                mobile: data.mobile,
            }));

            return { screen: 'Login', login: true }
        }
        return { login: false }
    } catch (error) {
        // console.error('Signup error:', error);
        return { success: false, error: (error as Error).message };
    }
}


export const SetMobile = async (mobile: string) => {
    try {
        const authData = storage.getString('auth');
        if (!authData) throw new Error('No auth data found');
        const { access_token } = JSON.parse(authData);
        const response = await fetch(`${API_BASE_URL}/SetMobile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify({ mobile }),
        });
        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
            const updatedAuthData = {
                ...JSON.parse(authData),
                mobile: mobile,
            };
            storage.set('auth', JSON.stringify(updatedAuthData));
            return true;
        }
        return false;
    }
    catch (error) {
        // console.error('SetMobile error:', error);
        return { success: false, error: (error as Error).message };
    }
}



export const Refresh_Access_token = async () => {
    try {
        const authData = storage.getString('auth');
        if (!authData) throw new Error('No auth data found');

        const { refresh_token } = JSON.parse(authData);

        const response = await fetch(`${API_BASE_URL}/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refresh_token}`,
            }
        });

        const data = await response.json();

        if (response.ok && data.Access_token) {
            const now = new Date().toISOString();
            const updatedAuthData = {
                ...JSON.parse(authData),
                access_token: data.Access_token,
                access_token_created_at: now,
            };
            storage.set('auth', JSON.stringify(updatedAuthData));
            return true;
        } else {
            storage.clearAll();
            return false;
        }
    } catch (error) {
        console.error('Refresh token error:', error);
        return false;
    }
};

