'use client';

import React, { useRef } from 'react';
import { Typography, Row, Col, Button } from 'antd';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ArrowRightOutlined } from '@ant-design/icons';

gsap.registerPlugin(ScrollTrigger);

const { Title, Paragraph, Text } = Typography;

// --- 🎨 BẢNG MÀU MỚI: "MANXI TEA & WOOD" (Ấm áp - Sang trọng) ---
const BRAND_COLORS = {
    // 1. Nền chính: Trắng sứ (Sạch sẽ, làm nổi bật hình ảnh)
    bgMain: '#FFFFFF',

    // 2. Nền phụ: Màu "Vỏ Hạnh Nhân" (Beige rất nhạt, ấm hơn màu xám, sang hơn màu vàng)
    bgAlt: '#F9F7F2',

    // 3. Chữ chính: Màu "Gỗ Walnut" (Nâu đen, mềm mại hơn màu đen tuyền)
    textDark: '#4A4238',

    // 4. Chữ phụ: Màu xám ấm
    textLight: '#8C857B',

    // 5. Màu nhấn: Màu "Đồng thau" (Bronze/Gold muted) - Nhìn đắt tiền hơn màu cam
    accent: '#B08D74',
};

// --- GIỮ NGUYÊN CODE LOGIC BÊN DƯỚI ---
// (Chỉ cần thay đổi biến BRAND_COLORS ở trên là toàn bộ giao diện tự đổi theo)

const IMAGES = {
    hero: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop',
    section1: 'https://images.unsplash.com/photo-1584813470613-5b1c11359832?q=80&w=2070&auto=format&fit=crop',
    section2: '/ManxiImage/taiwan.jpg',
    section3: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop',
    cta: '/ManxiImage/banner2.webp',
};

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = containerRef.current?.querySelectorAll('.reveal-section');
        sections?.forEach((section) => {
            gsap.fromTo(section,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                    }
                }
            );
        });
    }, { scope: containerRef });

    const sectionPadding = '100px 24px';

    return (
        <div ref={containerRef} className="bg-white overflow-hidden">

            {/* 1. Header Section */}
            <div className="reveal-section max-w-[1000px] mx-auto text-center px-5 pt-20 pb-16 md:pt-40 md:pb-24">
                <Text className="text-xs uppercase tracking-[4px] font-bold text-[#B08D74] block mb-6">
                    CÂU CHUYỆN THƯƠNG HIỆU
                </Text>
                <Title level={1} className="!font-serif !text-[40px] md:!text-[64px] !font-normal !text-[#4A4238] !leading-tight !mt-0 !mb-8">
                    Manxi Tự Sự – <span className="italic">Hành trình trở về</span>
                </Title>
                {/* Decoration Line */}
                <div className="w-[60px] h-[1px] bg-[#B08D74] mx-auto mb-8"></div>

                <Paragraph className="max-w-[640px] mx-auto text-lg md:text-xl text-[#8C857B] leading-relaxed px-4">
                    "Manxi bắt đầu câu chuyện của mình không phải tại Việt Nam, mà tại thành phố cảng Cao Hùng, Đài Loan."
                </Paragraph>
            </div>

            {/* Hero Image */}
            <div className="reveal-section w-full h-[50vh] md:h-[70vh] relative mb-20 md:mb-32">
                <Image
                    src={IMAGES.hero}
                    alt="Manxi Spa Interior"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>

            {/* 2. Quote Section */}
            <div className="reveal-section max-w-[1100px] mx-auto mb-20 md:mb-32 px-6">
                <Row gutter={[64, 48]} align="middle">
                    <Col xs={24} md={10}>
                        <div className="border-l border-[#B08D74] pl-10">
                            <Title level={2} className="!font-serif !text-3xl md:!text-[42px] !text-[#4A4238] !leading-snug !m-0">
                                "Mạn là sống chậm,<br />
                                <span className="text-[#B08D74]">Tẩy là gội rửa.</span>"
                            </Title>
                        </div>
                    </Col>
                    <Col xs={24} md={14}>
                        <Paragraph className="text-base md:text-lg leading-loose text-[#8C857B]">
                            Mang theo niềm tự hào về nghệ thuật <strong>'Gội đầu dưỡng sinh Việt Nam' (越式洗髮)</strong>, chúng tôi đã chinh phục những vị khách Đài Loan khó tính nhất bằng sự tận tâm và đôi bàn tay khéo léo của người Việt. Tại đất khách, cái tên <strong>Manxi - 漫洗</strong> ra đời. Chúng tôi muốn định nghĩa lại việc gội đầu: Không chỉ là làm sạch, mà là một nghi thức thư giãn chậm rãi và sâu lắng.
                        </Paragraph>
                    </Col>
                </Row>
            </div>

            {/* 3. ZigZag Sections */}

            {/* Section A - Beige Alt Background */}
            <div className="reveal-section bg-[#F9F7F2] py-16 px-6 md:py-24">
                <div className="max-w-[1200px] mx-auto">
                    <Row gutter={[80, 60]} align="middle">
                        <Col xs={24} md={12}>
                            <div className="relative h-[300px] md:h-[500px] overflow-hidden">
                                <Image src={IMAGES.section1} alt="Không gian trị liệu" fill style={{ objectFit: 'cover' }} />
                            </div>
                        </Col>
                        <Col xs={24} md={12}>
                            <Text className="block text-[#B08D74] uppercase tracking-widest text-xs font-semibold mb-4">KHÔNG GIAN</Text>
                            <Title level={3} className="!font-serif !text-3xl md:!text-4xl !text-[#4A4238] !leading-snug !mb-6">
                                Nét đẹp Á Đông<br />Thanh nhã & Tĩnh lặng
                            </Title>
                            <Paragraph className="text-base leading-relaxed text-[#8C857B]">
                                Vẫn là kỹ thuật gội đầu, massage cổ truyền Việt Nam, nhưng được nâng tầm bởi tiêu chuẩn dịch vụ khắt khe đúc kết từ Đài Loan. Không gian tại Manxi được thiết kế để tách biệt hoàn toàn với sự xô bồ bên ngoài.
                            </Paragraph>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Section B - White Background */}
            <div className="reveal-section bg-white py-16 px-6 md:py-24">
                <div className="max-w-[1200px] mx-auto">
                    <Row gutter={[80, 60]} align="middle">
                        {/* Text: Order 2 on Mobile (below image), Order 1 on Desktop (left) */}
                        <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 1 }}>
                            <Text className="block text-[#B08D74] uppercase tracking-widest text-xs font-semibold mb-4">NGUỒN GỐC</Text>
                            <Title level={3} className="!font-serif !text-3xl md:!text-4xl !text-[#4A4238] !leading-snug !mb-6">
                                Manxi mang quy trình ấy<br />trở về nhà
                            </Title>
                            <Paragraph className="text-base leading-relaxed text-[#8C857B]">
                                Manxi Spa Hóc Môn không chỉ là một chi nhánh mới, mà là lời khẳng định: <strong>Dịch vụ Việt, chất lượng Quốc tế</strong>. Chúng tôi sử dụng các sản phẩm thảo dược hữu cơ, kết hợp với lộ trình chăm sóc chuyên sâu.
                            </Paragraph>
                        </Col>
                        {/* Image: Order 1 on Mobile (top), Order 2 on Desktop (right) */}
                        <Col xs={{ span: 24, order: 1 }} md={{ span: 12, order: 2 }}>
                            <div className="relative h-[300px] md:h-[500px] w-full">
                                <Image
                                    src={IMAGES.section2}
                                    alt="Sản phẩm hữu cơ"
                                    fill
                                    style={{ objectFit: 'contain', borderRadius: '4px' }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Section C - Beige Alt Background */}
            <div className="reveal-section bg-[#F9F7F2] py-16 px-6 md:py-24">
                <div className="max-w-[1200px] mx-auto">
                    <Row gutter={[80, 60]} align="middle">
                        <Col xs={24} md={12}>
                            <div className="relative h-[300px] md:h-[500px] overflow-hidden">
                                <Image src={IMAGES.section3} alt="Kỹ thuật viên" fill style={{ objectFit: 'cover' }} />
                            </div>
                        </Col>
                        <Col xs={24} md={12}>
                            <Text className="block text-[#B08D74] uppercase tracking-widest text-xs font-semibold mb-4">CON NGƯỜI</Text>
                            <Title level={3} className="!font-serif !text-3xl md:!text-4xl !text-[#4A4238] !leading-snug !mb-6">
                                Đội ngũ kỹ thuật viên<br />tận tâm như người nhà
                            </Title>
                            <Paragraph className="text-base leading-relaxed text-[#8C857B]">
                                Mỗi kỹ thuật viên tại Manxi đều trải qua quá trình đào tạo bài bản, am hiểu về huyệt đạo và kinh lạc. Sự tận tâm không chỉ nằm ở kỹ thuật, mà còn ở cách chúng tôi lắng nghe cơ thể bạn.
                            </Paragraph>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* 4. CTA Banner */}
            <div className="reveal-section relative h-[400px] md:h-[500px] mt-0">
                <Image src={IMAGES.cta} alt="Manxi Lounge" fill style={{ objectFit: 'cover' }} />
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white/60 backdrop-blur-md rounded-lg p-10 md:p-14 max-w-[600px] w-[90%]">
                    <Title level={3} className="!font-serif !text-2xl md:!text-[32px] !text-[#4A4238] !mb-5">
                        Một nhịp nghỉ ngơi trọn vẹn
                    </Title>
                    <Paragraph className="mb-8 text-[#8C857B] text-base">
                        Dành tặng bản thân những giây phút bình yên tại Manxi.
                    </Paragraph>
                    <Button type="primary" size="large" className="bg-[#4A4238] border-[#4A4238] h-[50px] px-10 rounded text-white tracking-wider font-medium hover:!bg-[#6D5B4B] hover:!border-[#6D5B4B]">
                        ĐẶT LỊCH NGAY
                    </Button>
                </div>
            </div>

        </div>
    );
}