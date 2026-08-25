'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Collapse, ConfigProvider, Spin, Tabs } from 'antd';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { getServices, getServiceCategories, Service, ServiceCategory } from '@/lib/api';
import Lenis from 'lenis';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const { Title, Text, Paragraph } = Typography;

const BRAND_COLORS = {
    bgMain: '#F5F2EA',
    bgAlt: '#F5F2EA',
    primary: '#D4B483',
    textDark: '#4A4238',
    textLight: '#8C857B',
    white: '#FFFFFF',
};

export default function ServicesPage() {
    // 👇 Sử dụng Type chuẩn từ API
    const [services, setServices] = useState<Service[]>([]);
    const [categories, setCategories] = useState<ServiceCategory[]>([]);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const selectedCategorySlug = searchParams.get('category');

    // 1. Lenis Smooth Scroll
    useEffect(() => {
        const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        return () => { lenis.destroy(); };
    }, []);

    // 2. Fetch Data từ API thật
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const [servicesData, categoriesData] = await Promise.all([
                    getServices(),
                    getServiceCategories()
                ]);
                setServices(servicesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                // Có thể thêm thông báo lỗi UI ở đây nếu cần
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // 3. Logic Lọc & Tab
    const filteredServices = selectedCategorySlug
        ? services.filter(s => (s.category?.slug || s.categorySlug) === selectedCategorySlug)
        : services;

    const handleTabChange = (key: string) => {
        if (key === 'all') {
            router.replace(pathname, { scroll: false });
        } else {
            router.replace(`${pathname}?category=${key}`, { scroll: false });
        }
    };

    // 4. Custom Icon
    const expandIcon = ({ isActive }: { isActive?: boolean }) => (
        isActive ? <CaretDownOutlined style={{ color: BRAND_COLORS.white, fontSize: '18px' }} /> : <CaretRightOutlined style={{ color: BRAND_COLORS.white, fontSize: '18px' }} />
    );

    // 5. Map dữ liệu vào Collapse Items
    const items = filteredServices.map((service) => ({
        key: service._id, // Đảm bảo API trả về _id hoặc id
        label: (
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full pr-2 gap-1 md:gap-0">
                <Text className="font-serif text-lg md:text-xl text-white font-normal !text-white">{service.name}</Text>
                <Text className="text-white text-sm md:text-base italic opacity-90 !text-white">{service.duration} phút</Text>
            </div>
        ),
        children: (
            <div className="py-2">
                <Paragraph className="text-sm md:text-base text-[#4A4238] leading-relaxed whitespace-pre-line">
                    {service.description}
                </Paragraph>
                <div className="mt-5 flex items-baseline gap-1.5">
                    <Text className="text-sm md:text-base text-[#8C857B]">Giá:</Text>
                    <Text className="text-lg md:text-xl font-bold text-[#4A4238] font-serif">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                    </Text>
                </div>
            </div>
        ),
        style: { marginBottom: '12px', border: 'none', borderRadius: '0' }
    }));

    const tabItems = [{ key: 'all', label: 'Tất cả' }, ...categories.map(c => ({ key: c.slug, label: c.name }))];

    return (
        <ConfigProvider
            theme={{
                token: { colorPrimary: '#F5F2EA' },
                components: {
                    Collapse: { contentBg: '#F5F2EA', contentPadding: '24px 32px', headerPadding: '16px 24px' },
                    Tabs: { itemSelectedColor: '#C5A98E', itemHoverColor: '#C5A98E', itemColor: '#000', titleFontSize: 16 }
                },
            }}
        >
            <style>{`
                .ant-layout-content {
                    background-color: #F5F2EA !important
                }
                .custom-collapse .ant-collapse-item > .ant-collapse-header {
                    background-color: #4A4238 !important;
                    color: white !important;
                    border-radius: 25px !important;
                    transition: border-radius 0.3s ease;
                }

                .custom-collapse .ant-collapse-item-active > .ant-collapse-header {
                    border-radius: 25px 25px 0px 0px !important;
                }

                .custom-collapse .ant-collapse-body {
                    background-color: #ffffff !important;
                    color: #000 !important;
                    border-radius: 0px 0px 25px 25px !important;
                    border-top: none !important;
                }
                
                .custom-collapse .ant-collapse-item > .ant-collapse-header .ant-collapse-expand-icon,
                .custom-collapse .ant-collapse-item > .ant-collapse-header .anticon {
                    color: white !important;
                }

                .custom-collapse {
                    background-color: transparent !important;
                }
                .custom-collapse .ant-collapse-item {
                    border-bottom: none !important;
                }

                @media (max-width: 768px) {
                    .custom-collapse .ant-collapse-header {
                        padding: 12px 16px !important;
                    }
                    .custom-collapse .ant-collapse-content > .ant-collapse-content-box {
                        padding: 16px !important;
                    }
                }
            `}</style>

            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#F5F2EA',
                zIndex: -1
            }} />

            <div className="min-h-screen pt-[120px] px-5 pb-20 md:pt-[150px] md:px-12 max-w-[900px] mx-auto relative">
                {/* Header Title */}
                <div className="flex items-center justify-center gap-3 md:gap-5 mb-5">
                    <div className="w-10 md:w-20 h-[1px] bg-[#4A4238]"></div>
                    <Title level={1} style={{ margin: 0, fontFamily: 'serif', color: BRAND_COLORS.textDark, fontWeight: 400 }} className="text-3xl md:text-[42px] !mb-0 text-center">
                        Gói dịch vụ
                    </Title>
                    <div className="w-10 md:w-20 h-[1px] bg-[#4A4238]"></div>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <Tabs activeKey={selectedCategorySlug || 'all'} items={tabItems} onChange={handleTabChange} centered tabBarStyle={{ borderBottom: 'none' }} />
                </div>

                {/* Disclaimer */}
                <Paragraph className="text-center mb-12 text-sm md:text-base text-[#4A4238]">
                    Tất cả các dịch vụ Trọn gói đều được miễn phí xông hơi khô hoặc xông hơi ướt thảo dược.
                </Paragraph>

                {/* Content */}
                {loading ? (
                    <div className="text-center py-12">
                        <Spin size="large" />
                        <div className="mt-5 text-[#8C857B] font-serif">Đang tải dịch vụ...</div>
                    </div>
                ) : (
                    items.length > 0 ? (
                        <Collapse
                            className="custom-collapse"
                            accordion
                            items={items}
                            bordered={false}
                            expandIcon={expandIcon}
                            expandIconPlacement="end"
                            style={{ background: 'transparent' }}
                        />
                    ) : (
                        <div className="text-center py-10 text-[#8C857B]">Không tìm thấy dịch vụ nào trong danh mục này.</div>
                    )
                )}

                {/* Footer Note */}
                <Text className="block mt-10 text-center italic text-[#4A4238]">
                    **Giá trên đã bao gồm VAT**
                </Text>
            </div>
        </ConfigProvider>
    );
}