'use client';

import React, { useRef } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import {
    FacebookFilled,
    InstagramFilled,
    PhoneFilled,
} from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const { Title, Text, Paragraph } = Typography;

// Tiktok Icon Custom
const TikTokIcon = ({ style }: { style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" style={style}>
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
);



const ConnectSection = () => {
    const t = useTranslations('ConnectSection');
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const cards = containerRef.current?.querySelectorAll('.social-card');
        const banner = containerRef.current?.querySelector('.contact-banner');

        if (cards) {
            gsap.fromTo(cards,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }

        if (banner) {
            gsap.fromTo(banner,
                { scale: 0.95, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    delay: 0.4,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: banner,
                        start: 'top 90%',
                    }
                }
            );
        }
    }, { scope: containerRef });

    const socialLinks = [
        {
            key: 'facebook',
            icon: <FacebookFilled style={{ fontSize: '24px', color: '#6D5B4B' }} />, // Đổi màu icon về tone Spa cho đồng bộ
            name: 'Facebook',
            desc: 'Cập nhật ưu đãi',
            link: 'https://www.facebook.com/manxibeautyspa',
        },
        {
            key: 'zalo',
            // Sử dụng Image thay vì Icon component
            icon: <Image src="/icons8-zalo-64.png" alt="Zalo" width={24} height={24} style={{ objectFit: 'contain' }} />,
            name: 'Zalo',
            desc: 'Tư vấn 1:1',
            link: 'https://zalo.me',
        },
        {
            key: 'instagram',
            icon: <InstagramFilled style={{ fontSize: '24px', color: '#6D5B4B' }} />,
            name: 'Instagram',
            desc: 'Góc ảnh chill',
            link: 'https://instagram.com',
        },
        {
            key: 'tiktok',
            icon: <TikTokIcon style={{ fontSize: '24px', color: '#6D5B4B' }} />,
            name: 'TikTok',
            desc: 'Video trải nghiệm',
            link: 'https://tiktok.com',
        }
    ];

    return (
        <section
            ref={containerRef}
            style={{
                padding: '100px 20px',
                backgroundColor: '#F5F2EA', // Hoặc màu kem nhạt #fafafa nếu muốn tách nền
                textAlign: 'center',
                overflow: 'hidden'
            }}
        >
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                {/* Header Section */}
                <div style={{ marginBottom: '60px' }}>
                    <Text style={{
                        color: '#d4a373',
                        fontWeight: 600,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontSize: '12px'
                    }}>
                        Stay Connected
                    </Text>
                    <Title level={2} style={{
                        fontFamily: 'serif',
                        fontSize: 'clamp(32px, 4vw, 42px)',
                        marginTop: '10px',
                        color: '#1a3c40'
                    }}>
                        Kết nối cùng Manxi
                    </Title>
                    <Paragraph style={{
                        fontSize: '16px',
                        color: '#666',
                        maxWidth: '500px',
                        margin: '0 auto',
                        fontStyle: 'italic'
                    }}>
                        {t('subtitle') || 'Theo dõi chúng tôi để không bỏ lỡ những câu chuyện chữa lành và ưu đãi mới nhất.'}
                    </Paragraph>
                </div>

                {/* Social Cards Grid */}
                {/* Social Icons Row */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '24px',
                        marginBottom: '60px'
                    }}
                >
                    {socialLinks.map((item) => (
                        <a
                            key={item.key}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                        >
                            <div
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    backgroundColor: '#fff',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(0,0,0,0.02)',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                                }}
                            >
                                {item.icon}
                            </div>
                        </a>
                    ))}
                </div>

                {/* Banner Hotline Sang Trọng */}
                <div
                    className="contact-banner"
                    style={{
                        marginTop: '60px',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '24px',
                        // Gradient màu nâu đất pha chút đen để tạo chiều sâu
                        background: '#6D5B4B',
                        padding: '50px 20px',
                        boxShadow: '0 20px 40px -10px rgba(109, 91, 75, 0.4)'
                    }}
                >
                    {/* Họa tiết trang trí mờ (Noise/Grain) */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.1,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }} />

                    {/* Nội dung chính */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <Text style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '12px' }}>
                            Đặt lịch ngay
                        </Text>
                        <Title level={3} style={{
                            color: '#fff',
                            marginTop: '10px',
                            marginBottom: '25px',
                            fontFamily: 'serif',
                            fontSize: '32px'
                        }}>
                            0375 881 560
                        </Title>

                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                size="large"
                                style={{
                                    backgroundColor: '#fff',
                                    color: '#6D5B4B',
                                    border: 'none',
                                    height: '50px',
                                    padding: '0 40px',
                                    fontWeight: 600,
                                    borderRadius: '50px', // Bo tròn kiểu viên thuốc
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <PhoneFilled /> Gọi ngay
                            </Button>
                            <Button
                                size="large"
                                ghost
                                style={{
                                    color: '#fff',
                                    borderColor: 'rgba(255,255,255,0.5)',
                                    height: '50px',
                                    padding: '0 40px',
                                    fontWeight: 500,
                                    borderRadius: '50px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#fff';
                                    e.currentTarget.style.color = '#6D5B4B';
                                    e.currentTarget.style.borderColor = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                                }}
                            >
                                Gửi Email
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConnectSection;