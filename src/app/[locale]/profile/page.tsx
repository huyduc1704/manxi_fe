'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from '@/i18n/routing';
import Image from 'next/image';
import { User, Phone, Calendar, Clock, MapPin, Award, Edit2, Save, X } from 'lucide-react';
import { message } from 'antd'; // Dùng Ant Design message cho đẹp

interface Booking {
    _id: string;
    date: string;
    time: string;
    status: string;
    service: {
        name: string;
        duration: number;
        price: number;
    };
    note: string;
}

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading, login } = useAuth(); // login dùng để update user state
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
    });

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isLoading, isAuthenticated, router]);

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                phoneNumber: user.phoneNumber || '', // Giả sử model User có phoneNumber
            });
            fetchMyBookings();
        }
    }, [user]);

    const fetchMyBookings = async () => {
        try {
            const token = localStorage.getItem('manxi_token');
            const res = await fetch('http://localhost:8080/bookings/my-bookings', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            }
        } catch (error) {
            console.error('Failed to fetch bookings', error);
        } finally {
            setLoadingBookings(false);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const token = localStorage.getItem('manxi_token');
            const res = await fetch('http://localhost:8080/users/me', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const updatedUser = await res.json();
                // Cập nhật lại context
                login(token!, updatedUser);
                setIsEditing(false);
                message.success('Cập nhật thông tin thành công!');
            } else {
                message.error('Có lỗi xảy ra khi cập nhật.');
            }
        } catch (error) {
            message.error('Lỗi kết nối.');
        }
    };

    if (isLoading || !user) {
        return <div className="min-h-screen pt-32 text-center">Đang tải...</div>;
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-serif font-bold text-[#6D5B4B] mb-8 text-center md:text-left">Hồ sơ cá nhân</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: User Profile */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-32">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#F5E6D3] mb-4 relative">
                                    <Image
                                        src={user.avatar || '/images/default-avatar.png'}
                                        alt={user.fullName}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">{formData.fullName}</h2>
                                <p className="text-gray-500 text-sm">Thành viên thân thiết</p>

                                {/* Loyalty Points Badge */}
                                <div className="mt-4 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full flex items-center gap-2 border border-yellow-200">
                                    <Award size={18} />
                                    <span className="font-semibold">{user.loyaltyPoints || 0} Điểm tích lũy</span>
                                </div>
                            </div>

                            <hr className="border-gray-100 my-6" />

                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold text-gray-700">Thông tin chi tiết</h3>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="text-[#6D5B4B] hover:bg-[#F5E6D3] p-1.5 rounded-full transition-colors"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button onClick={handleUpdateProfile} className="text-green-600 hover:bg-green-50 p-1.5 rounded-full"><Save size={16} /></button>
                                            <button onClick={() => setIsEditing(false)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-full"><X size={16} /></button>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1">Họ và tên</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#6D5B4B]"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <User size={18} className="text-gray-400" />
                                                <span>{user.fullName}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1">Số điện thoại</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.phoneNumber}
                                                placeholder="Chưa cập nhật"
                                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#6D5B4B]"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <Phone size={18} className="text-gray-400" />
                                                <span>{user.phoneNumber || 'Chưa cập nhật'}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking History */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 min-h-[500px]">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Calendar className="text-[#6D5B4B]" />
                                Lịch sử đặt hẹn
                            </h3>

                            {loadingBookings ? (
                                <div className="text-center py-10 text-gray-400">Đang tải lịch sử...</div>
                            ) : bookings.length === 0 ? (
                                <div className="text-center py-10 text-gray-400 flex flex-col items-center">
                                    <Calendar size={48} className="mb-4 opacity-20" />
                                    <p>Bạn chưa có lịch đặt nào.</p>
                                    <button
                                        onClick={() => router.push('/booking')}
                                        className="mt-4 text-[#6D5B4B] font-semibold hover:underline"
                                    >
                                        Đặt lịch ngay
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {bookings.map((booking) => (
                                        <div key={booking._id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-gray-50/50">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-gray-800">{booking.service?.name || "Dịch vụ đã xóa"}</h4>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar size={14} />
                                                            {new Date(booking.date).toLocaleDateString('vi-VN')}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={14} />
                                                            {booking.time} ({booking.service?.duration} phút)
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {booking.status === 'pending' ? 'Chờ xác nhận' :
                                                        booking.status === 'confirmed' ? 'Đã xác nhận' :
                                                            booking.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                                                </span>
                                            </div>
                                            {booking.note && (
                                                <div className="mt-3 text-sm text-gray-500 bg-white p-2 rounded border border-gray-100">
                                                    Ghi chú: {booking.note}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
