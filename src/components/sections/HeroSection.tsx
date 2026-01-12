'use client';

import React from 'react';
import { Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const HeroSection = () => {
    return (
        <section style={{
            position: 'relative',
            width: '100%',
            height: '100vh', // Full viewport height
            overflow: 'hidden',
        }}>
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0,
                }}
            >
                <source src="/ManxiImage/manxi_clip.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay for contrast */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.3)', // Slight dark tint
                zIndex: 1,
            }} />

            {/* Content Container */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 20px',
            }}>
                {/* Main Heading */}
                <Title
                    level={1}
                    style={{
                        color: '#fff',
                        fontSize: 'clamp(40px, 8vw, 100px)',
                        fontFamily: 'serif',
                        fontWeight: 300,
                        margin: '0 0 40px',
                        letterSpacing: '2px',
                        textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    }}
                >
                    MANXI SPA
                </Title>

                {/* CTA Button */}
                <Button
                    type="primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                    style={{
                        height: '56px',
                        padding: '0 40px',
                        fontSize: '16px',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(255,255,255,0.8)',
                        color: '#fff',
                        borderRadius: '30px',
                        backdropFilter: 'blur(5px)',
                    }}
                    className="hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300"
                >
                    ĐẶT LỊCH NGAY
                </Button>
            </div>

            {/* Address Footer Overlay */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '0',
                width: '100%',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
                padding: '0 20px',
            }}>
                <div style={{
                    display: 'flex',
                    gap: '60px',
                    color: 'rgba(255,255,255,0.9)',
                    fontFamily: 'sans-serif',
                    fontSize: '14px',
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    {/* Vietnam Address */}
                    <div>
                        <Text strong style={{ color: '#fff', display: 'block', marginBottom: '4px', textTransform: 'uppercase', fontSize: '12px', opacity: 0.7 }}>
                            Việt Nam
                        </Text>
                        <div>64/7R, Ấp 10, Thới Tam Thôn, Hóc Môn, TP.HCM</div>
                        <div style={{ marginTop: '4px', fontSize: '13px' }}>Hotline: 0375 881 560</div>
                    </div>

                    {/* Taiwan Address */}
                    <div>
                        <Text strong style={{ color: '#fff', display: 'block', marginBottom: '4px', textTransform: 'uppercase', fontSize: '12px', opacity: 0.7 }}>
                            Đài Loan
                        </Text>
                        <div>高雄市苓雅區五福一路191號</div>
                        <div style={{ marginTop: '4px', fontSize: '13px' }}>電話: 072235455</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;