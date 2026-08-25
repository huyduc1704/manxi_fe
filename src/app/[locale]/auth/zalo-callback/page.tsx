'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ZaloCallbackPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { login } = useAuth();
    const [status, setStatus] = useState('Đang xử lý đăng nhập Zalo...');

    const isProcessed = React.useRef(false); // Ref để chặn gọi 2 lần (React Strict Mode)

    useEffect(() => {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (isProcessed.current) return; // Nếu đã xử lý rồi thì thôi

        if (error) {
            setStatus('Đăng nhập thất bại hoặc bị hủy.');
            isProcessed.current = true;
            return;
        }

        if (code) {
            isProcessed.current = true; // Đánh dấu đã xử lý ngay lập tức

            // Gọi Backend để đổi Code lấy Token
            fetch('http://localhost:8080/auth/zalo-login-web', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            })
                .then(async (res) => {
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.message || 'Lỗi đăng nhập');
                    return data;
                })
                .then((data) => {
                    // data: { accessToken, user }
                    login(data.accessToken, data.user);
                    setStatus('Đăng nhập thành công! Đang chuyển hướng...');
                    setTimeout(() => {
                        router.push('/'); // Về trang chủ
                    }, 1000);
                })
                .catch((err) => {
                    console.error(err);
                    setStatus(`Lỗi: ${err.message}`);
                    // Nếu lỗi do code hết hạn, có thể redirect về trang login để user làm lại
                    setTimeout(() => {
                        router.push('/');
                    }, 3000);
                });
        }
    }, [searchParams, login, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8 bg-white rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">Xác thực Zalo</h2>
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">{status}</p>
            </div>
        </div>
    );
}
