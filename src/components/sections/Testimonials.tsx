'use client';

import React from 'react';
import { Typography, Rate, Avatar, Card, Carousel, Grid } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

// DATA MẪU (Bạn thay nội dung thật từ Google Maps vào đây)
const REVIEWS = [
    {
        id: 1,
        name: 'Phụng Kim',
        date: '09/2025',
        content: 'mình vô tình thấy trên gg map nên nhắn thử cho chị chủ mà chị chủ rất nhiệt tình chụp bảng giá cho mình mấy lần lun.mặc dù mình tới trễ so với giờ đóng cửa nhma nhân viên vẫn rất nhiệt tình với mình.Gói để 70p mà phải gần 90p mới xong á làm rất kỹ từng bước lun.Tiệm mới mở nên chưa nhiều bạn biết tới mng trải nghiệm thử nha bảo đảm uy tín ko seedingggg',
        avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWhXoia8Jx7Jtg89ceZP8w6X6DtuAvbkVJ0XJL4oKOBOtNxW5c=w72-h72-p-rp-mo-br100',
        rating: 5,
    },
    {
        id: 2,
        name: 'nguyễn thị hương giang nguyen',
        date: '06/2025',
        content: 'Không gian yên tĩnh, mùi tinh dầu thoang thoảng cùng tiếng nhạc du dương đã mang lại cảm giác thư thái ngay từ phút đầu tiên. Nhân viên ở đây rất tận tâm và nhẹ nhàng, từ cách',
        avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUkUg_nXS95PBcdhobLU6i-IDTEPj4Gut5Md5RotHoqltxATIQ=w36-h36-p-rp-mo-br100',
        rating: 5,
    },
    {
        id: 3,
        name: 'Kim Phượng Văng Thị',
        date: '06/2025',
        content: 'Nhân viên phục vụ chu đáo, dễ thương. \nLần đầu tiên trải nghiệm gội đầu dưỡng trung hoa thật là thoải mái thư giãn. \nLần sau sẽ quay lại ủng hộ',
        avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjU0DK-DJA6jRbA6RHE38UA5lWQ5Yq9xe0dRuBgiEi1M1d2KjbqW=w36-h36-p-rp-mo-br100',
        rating: 5,
    },
    {
        id: 4,
        name: 'Thảo Cô',
        date: '08/2025',
        content: 'Cách phục vụ khiến mình rất hài lòng. Trang trí quán hiện đại và sang trọng.',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKbg4qGGASRAdy4-Sf86BS8BWMLEFnuXYjihBYLtE8_87UNfw=w36-h36-p-rp-mo-ba4-br100',
        rating: 5,
    },
];

// Component Card Review riêng lẻ (để tái sử dụng)
const ReviewCard = ({ review }: { review: any }) => (
    <Card
        variant="borderless"
        hoverable
        className="review-card"
        style={{
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            height: '100%',
            maxWidth: '400px', // Limit width for better carousel display
            margin: '0 auto', // Center in slide
            background: 'rgba(255, 255, 255, 0.95)', // Slightly transparent
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <Avatar
                src={review.avatar || null}
                icon={!review.avatar && <UserOutlined />}
                size={48}
                style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
            />
            <div style={{ marginLeft: '12px', flex: 1 }}>
                <Text strong style={{ display: 'block', fontSize: '16px', color: '#1a3c40' }}>{review.name}</Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>{review.date}</Text>
            </div>
            {/* Google Icon SVG */}
            <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: 0.8 }}
            >
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.769 -21.864 51.959 -21.864 51.129 C -21.864 50.299 -21.734 49.489 -21.484 48.729 L -21.484 45.639 L -25.464 45.639 C -26.284 47.269 -26.754 49.129 -26.754 51.129 C -26.754 53.129 -26.284 54.989 -25.464 56.619 L -21.484 53.529 Z" />
                    <path fill="#EA4335" d="M -14.754 43.769 C -12.984 43.769 -11.424 44.369 -10.174 45.579 L -6.684 42.089 C -8.804 40.109 -11.514 38.989 -14.754 38.989 C -19.444 38.989 -23.494 41.689 -25.464 45.639 L -21.484 48.729 C -20.534 45.879 -17.884 43.769 -14.754 43.769 Z" />
                </g>
            </svg>
        </div>

        <Rate disabled defaultValue={review.rating} style={{ fontSize: '14px', color: '#faad14', marginBottom: '15px' }} />

        <Paragraph
            ellipsis={{ rows: 4, expandable: true, symbol: 'Xem thêm' }}
            style={{ color: '#555', fontSize: '15px', lineHeight: '1.6', minHeight: '80px' }}
        >
            "{review.content}"
        </Paragraph>
    </Card>
);

const Testimonials = () => {
    const screens = useBreakpoint();

    // Determine slides based on explicit Ant Design breakpoints
    let slidesToShow = 3;
    if (screens.lg) {
        slidesToShow = 3;
    } else if (screens.md) {
        slidesToShow = 2;
    } else if (screens.xs || screens.sm) {
        slidesToShow = 1;
    }

    // Fallback: if useBreakpoint hasn't hydrated yet (SSV/first render), default to 1 (mobile-first) to avoid overflow
    // or checks for empty object (during mount)
    if (Object.keys(screens).length === 0) {
        slidesToShow = 1;
    }

    return (
        <section className="relative py-12 px-4 md:py-24 md:px-5 text-white overflow-hidden">
            {/* ... (Background Image and Overlay remain unchanged) ... */}

            {/* Background Image */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                backgroundColor: '#333'
            }}>
                <Image
                    src="/ManxiImage/service7.jpg"
                    alt="Manxi Spa Background"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={false}
                />
            </div>

            {/* Dark Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.6)',
                zIndex: 1
            }} />

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
                        <span style={{ width: '30px', height: '1px', background: '#C8A97E' }}></span>
                        <Text style={{ color: '#C8A97E', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
                            Feedback
                        </Text>
                        <span style={{ width: '30px', height: '1px', background: '#C8A97E' }}></span>
                    </div>
                    <Title level={2} className="!text-3xl md:!text-[42px] !mt-0 !text-white !font-serif">
                        Khách hàng nói gì về Manxi?
                    </Title>
                    <div style={{ marginTop: '10px' }}>
                        <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                            (Đánh giá được xác thực trên Google Maps)
                        </Text>
                    </div>
                </div>

                {/* Carousel Layout */}
                <div className="px-0 md:px-5">
                    <style jsx global>{`
                        .custom-equal-height-carousel .slick-track {
                            display: flex !important;
                            align-items: stretch;
                        }
                        .custom-equal-height-carousel .slick-slide {
                            height: auto;
                            display: flex;
                            justify-content: center;
                            padding: 0 10px;
                        }
                        .custom-equal-height-carousel .slick-slide > div {
                            flex: 1;
                            display: flex;
                            height: 100%;
                            width: 100%;
                        }
                        .custom-equal-height-carousel .slick-dots {
                            bottom: -40px !important; 
                        }
                        .custom-equal-height-carousel .slick-dots li button:before {
                            font-size: 10px;
                            color: #fff; 
                            opacity: 0.5;
                        }
                        .custom-equal-height-carousel .slick-dots li.slick-active button:before {
                            color: #C8A97E !important;
                            opacity: 1;
                        }
                    `}</style>
                    <Carousel
                        autoplay
                        autoplaySpeed={4000}
                        slidesToShow={slidesToShow}
                        slidesToScroll={1}
                        dots={{ className: 'custom-dots' }}
                        className="custom-equal-height-carousel"
                        key={slidesToShow} // Force re-render when slides change to avoid glitch
                    >
                        {REVIEWS.map((review) => (
                            <div key={review.id} className="h-full py-4">
                                <ReviewCard review={review} />
                            </div>
                        ))}
                    </Carousel>
                </div>

                {/* ... (Footer link remains unchanged) ... */}
                <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <a
                        href="https://maps.app.goo.gl/evGKUZvJgTHn3eCC9"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            display: 'inline-block',
                            border: '1px solid rgba(255,255,255,0.6)',
                            padding: '10px 30px',
                            color: '#fff',
                            fontWeight: 500,
                            cursor: 'pointer',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontSize: '13px',
                            transition: 'all 0.3s'
                        }}
                        className="hover:bg-white hover:text-black"
                    >
                        Xem tất cả đánh giá trên Google Maps &rarr;
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Testimonials;