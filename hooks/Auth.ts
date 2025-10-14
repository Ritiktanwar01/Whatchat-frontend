import { storage } from "../app/utils/MMKVSetup";


export const Signup = async ({ email }: { email: string }) => {
    try {
        const response = await fetch('http://97.74.90.82:5500/SendOtp', {
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
        // console.log(data);
        return { res: data, status: data.status };
    } catch (error) {
        // console.error('Signup error:', error);
        return { success: false, error: (error as Error).message };
    }
};

export const VerifyOTP = async ({ email, otp }: { email: string, otp: string }) => {
    try {

        const response = await fetch('http://97.74.90.82:5500/login', {
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
        if (data.login === true) {
            storage.set('auth', JSON.stringify({
                loginState: data.login,
                access_token: data.Access_token,
                refresh_token: data.Refresh_token,
                mobile: '',
            }));
            return true
        }
        return false
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
        const response = await fetch('http://97.74.90.82:5500/SetMobile', {
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


