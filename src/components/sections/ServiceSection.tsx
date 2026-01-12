'use client';

import React, { useState } from 'react';
import { Typography, Row, Col, Button } from 'antd';
import Image from 'next/image';

const { Title, Text } = Typography;

const SERVICES = [
    {
        id: 1,
        icon: '/ManxiImage/full.svg',
        title: 'TRỌN GÓI',
        fullTitle: 'Trọn gói (Signature Combos)',
        description: 'Sự kết hợp tinh tế giữa nghệ thuật dưỡng sinh Đông Y và công nghệ hiện đại. Các gói Signature của Manxi là một hành trình khép kín: từ gội đầu thảo dược, massage trị liệu đến nằm giường AI thư giãn. Đặc biệt, tặng kèm dịch vụ xông hơi thảo mộc giúp thải độc sâu, để bạn bước ra với một cơ thể nhẹ nhõm và tràn đầy sinh khí.'
    },
    {
        id: 2,
        icon: '/ManxiImage/massage.svg',
        title: 'MASSAGE',
        fullTitle: 'Thư giãn toàn thân (Body Therapy)',
        description: "Không chỉ là massage, đây là liệu pháp 'chữa lành' cho cơ thể. Kỹ thuật viên Manxi sử dụng lực day ấn chuẩn xác theo phương pháp Đài Loan, đi sâu vào từng huyệt đạo để đả thông kinh lạc và đánh tan những nút thắt cơ bắp. Tùy chỉnh lực đạo theo cảm nhận của riêng bạn, giúp xua tan mệt mỏi tích tụ lâu ngày."
    },
    {
        id: 3,
        icon: '/ManxiImage/skin.svg',
        title: 'CHĂM SÓC DA',
        fullTitle: 'Chăm sóc da (Facial Care)',
        description: 'Đánh thức vẻ đẹp nguyên bản của làn da bằng những nguyên liệu thuần khiết nhất. Liệu trình kết hợp giữa ngọc đá tự nhiên và mỹ phẩm lành tính, giúp cấp ẩm sâu và phục hồi màng bảo vệ da. Một làn da căng mướt, rạng rỡ là kết quả của sự nâng niu và thấu hiểu.'
    },
    {
        id: 4,
        icon: '/ManxiImage/hair.svg',
        title: 'CHĂM SÓC TÓC',
        fullTitle: 'Chăm sóc tóc & Da đầu (Head Spa)',
        description: "Trở về với thiên nhiên cùng liệu pháp gội đầu dưỡng sinh thuần mộc. Manxi nói không với hóa chất tẩy rửa mạnh, chỉ sử dụng nước gội thảo dược nấu tươi và các tinh chất thiên nhiên lành tính. Kết hợp với kỹ thuật massage đầu 'Mạn Khê' chậm rãi, giúp nuôi dưỡng nang tóc chắc khỏe và đưa tâm trí vào trạng thái thư giãn tuyệt đối."
    },
];

const ServiceSection = () => {
    const [activeServiceId, setActiveServiceId] = useState(SERVICES[0].id);

    const activeService = SERVICES.find(s => s.id === activeServiceId) || SERVICES[0];

    return (
        <section style={{
            padding: '100px 20px',
            backgroundColor: '#F5F2EA', // Beige background match
            textAlign: 'center'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Title level={2} style={{
                    fontFamily: 'serif',
                    fontWeight: 400,
                    fontSize: '42px',
                    marginBottom: '80px',
                    color: '#3e3a36'
                }}>
                    Dịch vụ của Manxi
                </Title>

                {/* Icons Row */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '60px',
                    marginBottom: '60px',
                    flexWrap: 'wrap'
                }}>
                    {SERVICES.map((service) => {
                        const isActive = service.id === activeServiceId;
                        return (
                            <div
                                key={service.id}
                                onClick={() => setActiveServiceId(service.id)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    opacity: isActive ? 1 : 0.5,
                                    transition: 'opacity 0.3s ease',
                                }}
                            >
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    marginBottom: '15px',
                                    position: 'relative'
                                }}>
                                    <Image
                                        src={service.icon}
                                        alt={service.title}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                                <Text style={{
                                    fontWeight: 600,
                                    color: isActive ? '#6D5B4B' : '#888', // Gold if active
                                    textTransform: 'uppercase',
                                    fontSize: '13px',
                                    letterSpacing: '1px'
                                }}>
                                    {service.title}
                                </Text>
                            </div>
                        );
                    })}
                </div>

                {/* Description Content */}
                <div style={{ maxWidth: '800px', margin: '0 auto', minHeight: '150px' }}>
                    <div className="fade-in-content" key={activeService.id}> {/* Key change triggers re-render/anim if CSS present */}
                        <Text style={{
                            fontSize: '16px',
                            color: '#555',
                            lineHeight: '1.8',
                            display: 'block',
                            marginBottom: '40px'
                        }}>
                            {activeService.description}
                        </Text>

                        <Button
                            type="primary"
                            style={{
                                backgroundColor: '#6D5B4B',
                                borderColor: '#6D5B4B',
                                color: '#fff',
                                textTransform: 'uppercase',
                                fontSize: '12px',
                                fontWeight: 600,
                                letterSpacing: '1px',
                                height: '44px',
                                padding: '0 30px',
                                borderRadius: '0'
                            }}
                        >
                            XEM CHI TIẾT
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceSection;
