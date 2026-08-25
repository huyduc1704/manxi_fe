'use client';

import React from 'react';
import Image from 'next/image';

export default function ZaloLoginButton() {

    const handleLogin = () => {
        const appId = '841380323232713552'; // App ID (Public)
        // Callback URL phải trùng khớp với cấu hình "Domain/Callback URL" trên Zalo Developers
        // Lưu ý: Localhost không được Zalo hỗ trợ qua HTTP thường, nên dùng ngrok hoặc sửa host file nếu cần.
        // Tuy nhiên với Web App, Zalo cho phép localhost nếu cấu hình đúng trong phần "Login URL".
        // Tạm thời để localhost:3000/auth/zalo-callback
        const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/auth/zalo-callback` : '';
        const state = 'manxi_login'; // Random state để chống CSRF (có thể nâng cấp sau)

        const zaloAuthUrl = `https://oauth.zalo.me/v4/permission?app_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;

        window.location.href = zaloAuthUrl;
    };

    return (
        <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 w-full shadow-lg"
            style={{ backgroundColor: '#0068FF' }} // Zalo Brand Color
        >
            <div className="w-6 h-6 relative bg-white rounded-full p-1">
                {/* Logo Zalo (Tạm thời dùng Text Z nếu chưa có icon) */}
                <span className="text-blue-600 font-bold text-xs absolute inset-0 flex items-center justify-center">Z</span>
            </div>
            <span>Đăng nhập bằng Zalo</span>
        </button>
    );
}
