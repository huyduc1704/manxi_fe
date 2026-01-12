'use client';

import React from 'react';
import { Layout, Row, Col, Typography, Flex } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
    FacebookFilled,
    TwitterSquareFilled,
    YoutubeFilled,
    LinkedinFilled,
} from '@ant-design/icons';
import { useTranslations } from 'next-intl';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer = () => {
    const t = useTranslations('Footer');

    return (
        <AntFooter style={{ background: '#D7CDC0', padding: '60px 50px', color: '#333' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Row gutter={[40, 40]}>
                    {/* Brand Column */}
                    <Col xs={24} md={8} lg={8}>
                        <Flex vertical gap="large">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Image
                                    src="/logo_manxi.svg"
                                    alt="Manxi Spa"
                                    width={100}
                                    height={30}
                                    style={{ width: '100px', height: 'auto' }}
                                />
                            </div>
                            <Text style={{ maxWidth: '250px', display: 'block', color: '#555' }}>
                                {t('slogan')}
                            </Text>
                            <Flex gap="middle">
                                <FacebookFilled style={{ fontSize: '24px', cursor: 'pointer', color: '#333' }} />
                                <TwitterSquareFilled style={{ fontSize: '24px', cursor: 'pointer', color: '#333' }} />
                                <YoutubeFilled style={{ fontSize: '24px', cursor: 'pointer', color: '#333' }} />
                                <LinkedinFilled style={{ fontSize: '24px', cursor: 'pointer', color: '#333' }} />
                            </Flex>
                        </Flex>
                    </Col>

                    {/* Contact Column */}
                    <Col xs={24} sm={12} md={5} lg={5}>
                        <Title level={5} style={{ marginBottom: '5px' }}>{t('contact')}</Title>
                        <Flex vertical gap={4} style={{ color: '#555' }}>
                            <div>
                                <PhoneOutlined style={{ marginRight: '5px' }} /><Text>0375881560</Text>
                            </div>
                            <div>
                                <MailOutlined style={{ marginRight: '5px' }} /><Text>manxibeautyspa@gmail.com</Text>
                            </div>
                            <div style={{ marginTop: '5px' }}>
                                <Text strong>{t('address')}</Text>
                                <br />
                                <Text>
                                    64/7R, Ấp Tam Đông 1, Xã Thới Tam Thôn, Huyện Hóc Môn, Thành phố Hồ Chí Minh
                                </Text>
                            </div>
                        </Flex>
                    </Col>

                    {/* Explore Column */}
                    <Col xs={24} sm={12} md={5} lg={5}>
                        <Title level={5} style={{ marginBottom: '20px' }}>{t('services')}</Title>
                        <Flex vertical gap="middle">
                            {['fullPackage', 'bodyRelax', 'hairCare'].map((item) => (
                                <Link href="/" key={item} style={{ color: '#555', textDecoration: 'none' }}>
                                    {t(`serviceList.${item}`)}
                                </Link>
                            ))}
                        </Flex>
                    </Col>

                    {/* Support Column */}
                    <Col xs={24} sm={12} md={6} lg={6}>
                        <Title level={5} style={{ marginBottom: '20px' }}>{t('support')}</Title>
                        <Flex vertical gap="middle">
                            {/* Simple placeholders for now */}
                            <Link href="#" style={{ color: '#555', textDecoration: 'none' }}>Help Center</Link>
                            <Link href="#" style={{ color: '#555', textDecoration: 'none' }}>Privacy Policy</Link>
                        </Flex>
                    </Col>
                </Row>

                <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.1)', textAlign: 'center' }}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>© {new Date().getFullYear()} Manxi Spa</Text>
                </div>
            </div>
        </AntFooter>
    );
};

export default Footer;
