'use client';

import React from 'react';
import { Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link'; // Dùng Link để chuyển trang
import Masonry from 'react-masonry-css'; // Import thư viện mới
import { useTranslations } from 'next-intl';
import { BLOGS } from '@/data/blogs';

const { Title, Text, Paragraph } = Typography;

// Cấu hình tỉ lệ thủ công cho 6 bài viết để Grid đẹp nhất (3 cột)
// Col 1: Item 0 (3/4) + Item 3 (1/1) = 1.33 + 1.0 = 2.33
// Col 2: Item 1 (3/4) + Item 4 (3/4) = 1.33 + 1.33 = 2.66
// Col 3: Item 2 (1/1) + Item 5 (4/3) = 1.0 + 0.75 = 1.75 => Hơi ngắn
// KHẮC PHỤC: Điều chỉnh lại tỉ lệ để cân bằng hơn
const MANUAL_RATIOS = [
    '3/4',  // Bài 1: Dọc (Col 1)
    '3/4',  // Bài 2: Dọc (Col 2)
    '3/4',  // Bài 3: Dọc (Col 3) - Cho hàng đầu đều nhau
    '1/1',  // Bài 4: Vuông (Col 1) -> Tổng: 1.75 + 1 = 2.75
    '4/3',  // Bài 5: Ngang (Col 2) -> Tổng: 1.75 + 0.75 = 2.5
    '1/1'   // Bài 6: Vuông (Col 3) -> Tổng: 1.75 + 1 = 2.75
];

// Map dữ liệu
const STORIES = BLOGS.map((blog, index) => ({
    id: blog.id,
    title: blog.title,
    image: blog.thumbnail,
    slug: blog.slug,
    // 👇 Dùng tỉ lệ thủ công cho đẹp đội hình
    aspectRatio: MANUAL_RATIOS[index] || '3/4'
}));

export default function BlogPage() {
    const t = useTranslations('Header');

    // Cấu hình Responsive cho Masonry (Số cột theo màn hình)
    const breakpointColumnsObj = {
        // 👇 KHI NÀO CÓ NHIỀU BÀI VIẾT (>10 bài), anh hãy sửa số '3' này thành '4' hoặc '5' cho đẹp nhé!
        default: 3,
        1100: 3,      // Laptop nhỏ
        700: 2,       // Tablet
        500: 1        // Mobile
    };

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>

            {/* Header */}
            <div style={{ maxWidth: '1800px', margin: '0 auto', padding: '0 20px', textAlign: 'center', marginBottom: '40px' }}>
                <Title level={1} style={{ fontFamily: 'serif', fontWeight: 400, fontSize: '32px', color: '#111', marginBottom: '10px' }}>
                    {t('blog')}
                </Title>
                <Paragraph style={{ fontSize: '16px', color: '#555', maxWidth: '600px', margin: '0 auto' }}>
                    Những câu chuyện nhỏ, những chia sẻ chân thành từ Mạn Khê.
                </Paragraph>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: '1800px', margin: '0 auto', padding: '0 16px' }}>

                {/* Global CSS cho Masonry và Hover Effect */}
                <style jsx global>{`
                    .my-masonry-grid {
                        display: flex;
                        margin-left: -24px; /* Tăng gap lên 24px cho thoáng */
                        width: auto;
                    }
                    .my-masonry-grid_column {
                        padding-left: 24px; /* Gap 24px */
                        background-clip: padding-box;
                    }

                    /* Pinterest Hover Animation */
                    .pin-card {
                        transition: transform 0.2s ease;
                    }
                    .pin-card:hover .pin-overlay {
                        opacity: 1;
                    }
                    .pin-card:hover .pin-image {
                        filter: brightness(0.7); /* Làm tối ảnh khi hover */
                        transform: scale(1.05);  /* Zoom nhẹ ảnh */
                    }
                `}</style>

                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {STORIES.map((story) => (
                        <div key={story.id} style={{ marginBottom: '32px' }}> {/* Tăng margin bottom */}
                            <Link href={`/blog/${story.slug}`}>
                                <div className="pin-card group cursor-pointer" style={{ height: '100%' }}>

                                    {/* 1. Image Container */}
                                    <div style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: '20px', // Bo góc lớn hơn xíu (20px)
                                        backgroundColor: '#f5f5f5',
                                        aspectRatio: story.aspectRatio,
                                        marginBottom: '16px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)' // Đổ bóng nhẹ cực chill
                                    }}>
                                        <Image
                                            src={story.image}
                                            fill
                                            className="pin-image"
                                            style={{
                                                objectFit: 'cover',
                                                transition: 'all 0.4s ease'
                                            }}
                                            alt={story.title}
                                        />

                                        {/* 2. Overlay & Buttons (Chỉ hiện khi Hover) */}
                                        <div className="pin-overlay" style={{
                                            position: 'absolute',
                                            inset: 0,
                                            padding: '16px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            opacity: 0,
                                            transition: 'opacity 0.2s ease',
                                            zIndex: 10
                                        }}>
                                            {/* Nút Save (Đỏ) - Góc trên phải */}
                                            <div style={{ alignSelf: 'flex-end' }}>
                                                <button style={{
                                                    backgroundColor: '#E60023', // Pinterest Red
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '10px 18px',
                                                    borderRadius: '24px',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                                }}>
                                                    Đọc ngay
                                                </button>
                                            </div>

                                            {/* Nút Link (Trắng) - Góc dưới trái */}
                                            <div style={{ alignSelf: 'flex-start' }}>
                                                <div style={{
                                                    backgroundColor: 'rgba(255,255,255,0.95)',
                                                    padding: '8px 14px',
                                                    borderRadius: '20px',
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                    color: '#111',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                }}>
                                                    ↗ manxispa.vn
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Text Info (Bên dưới ảnh) */}
                                    <div style={{ padding: '0 8px' }}>
                                        <h3 style={{
                                            fontSize: '18px', // To hơn chút
                                            fontWeight: '700', // Đậm hơn
                                            color: '#222',
                                            marginBottom: '8px',
                                            lineHeight: '1.4',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            fontFamily: 'var(--font-svn-gilroy), sans-serif'
                                        }}>
                                            {story.title}
                                        </h3>

                                        {/* Author Info */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden', position: 'relative', border: '1px solid #eee' }}>
                                                <Image src="/logo_manxi.svg" fill style={{ objectFit: 'cover' }} alt="author" />
                                            </div>
                                            <span style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>Mạn Khê</span>
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    );
}