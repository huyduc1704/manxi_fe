'use client';

import React from 'react';
import { Layout, Menu, Button, ConfigProvider } from 'antd';
import { usePathname, useRouter, Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

import { getServiceCategories, ServiceCategory } from '@/lib/api';

const { Header: AntHeader } = Layout;
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';

const Header = () => {
    const t = useTranslations('Header');
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [categories, setCategories] = React.useState<ServiceCategory[]>([]);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Fetch categories for menu
        getServiceCategories().then(data => setCategories(data));

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { key: '/', label: t('home') },
        { key: '/about', label: t('about') },
        {
            key: '/services',
            label: t('services'),
            children: categories.length > 0 ? categories.map(cat => ({
                key: `/services?category=${cat.slug}`,
                label: (
                    <Link href={`/services?category=${cat.slug}`} style={{ fontSize: '14px' }} onClick={() => setMobileMenuOpen(false)}>
                        {cat.name}
                    </Link>
                )
            })) : undefined
        },
        { key: '/gallery', label: t('gallery') },
        { key: '/contact', label: t('contact') },
    ];

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setMobileMenuOpen(false);
    };

    // Show header if scrolled OR hovered
    const isVisible = isScrolled || isHovered || mobileMenuOpen;

    return (
        <AntHeader
            style={{
                position: 'fixed',
                top: 5,
                zIndex: 100,
                width: '100%',
                background: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                padding: '0 24px',
                height: 'auto',
                lineHeight: 'normal',
                pointerEvents: 'none',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="header-glass"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: '1700px',
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(10px) saturate(300%)',
                    WebkitBackdropFilter: 'blur(10px) saturate(300%)',
                    borderRadius: '50px',
                    padding: '10px 30px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'all 0.3s ease-in-out',
                    transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
                    pointerEvents: 'auto',
                }}
            >
                {/* Logo Section */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                        src="/logo_manxi.svg"
                        alt="Manxi Spa Logo"
                        width={120}
                        height={40}
                        style={{ width: '120px', height: 'auto' }}
                        priority
                    />
                </Link>

                {/* DESKTOP MENU - Hidden on Mobile */}
                <div className="hidden md:flex flex-1 justify-center">
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#6D5B4B',
                            },
                            components: {
                                Menu: {
                                    itemColor: '#333',
                                    itemSelectedColor: '#6D5B4B',
                                    itemHoverColor: '#6D5B4B',
                                    horizontalItemSelectedColor: '#6D5B4B',
                                    horizontalItemHoverColor: '#6D5B4B',
                                },
                            },
                        }}
                    >
                        <Menu
                            mode="horizontal"
                            selectedKeys={[pathname]}
                            items={menuItems.map((item) => ({
                                key: item.key,
                                label: (
                                    <Link href={item.key} style={{ fontSize: '15px', fontWeight: 500, color: 'inherit' }}>
                                        {item.label}
                                    </Link>
                                ),
                                children: item.children,
                                popupClassName: "glass-dropdown"
                            }))}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                borderBottom: 'none',
                                background: 'transparent',
                                minWidth: 0,
                                margin: '0 20px',
                            }}
                        />
                    </ConfigProvider>
                </div>

                {/* MOBILE HAMBURGER - Visible only on Mobile */}
                <div className="md:hidden">
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{ fontSize: '20px', color: '#6D5B4B' }} />}
                        onClick={() => setMobileMenuOpen(true)}
                    />
                </div>

                {/* Language Selector (Desktop) - Hidden on Mobile to save space */}
                <div className="hidden md:flex items-center gap-2">
                    <Button
                        type="text"
                        shape="circle"
                        style={{
                            fontWeight: locale === 'vi' ? 700 : 400,
                            color: locale === 'vi' ? '#333' : '#999',
                            pointerEvents: 'auto'
                        }}
                        onClick={() => switchLocale('vi')}
                    >
                        VN
                    </Button>
                    <span style={{ color: '#ccc' }}>|</span>
                    <Button
                        type="text"
                        shape="circle"
                        style={{
                            fontWeight: locale === 'en' ? 700 : 400,
                            color: locale === 'en' ? '#333' : '#999',
                            pointerEvents: 'auto'
                        }}
                        onClick={() => switchLocale('en')}
                    >
                        EN
                    </Button>
                </div>
            </div>

            {/* MOBILE DRAWER */}
            <Drawer
                title={
                    <div className="flex justify-between items-center w-full">
                        <Image src="/logo_manxi.svg" alt="Manxi Logo" width={100} height={35} />
                        <div className="flex gap-2">
                            <Button size="small" type={locale === 'vi' ? 'primary' : 'default'} onClick={() => switchLocale('vi')}>VN</Button>
                            <Button size="small" type={locale === 'en' ? 'primary' : 'default'} onClick={() => switchLocale('en')}>EN</Button>
                        </div>
                    </div>
                }
                placement="right"
                onClose={() => setMobileMenuOpen(false)}
                open={mobileMenuOpen}
                styles={{ body: { padding: 0 }, wrapper: { width: 300 } }}
            >
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#6D5B4B',
                        },
                    }}
                >
                    <Menu
                        mode="inline"
                        selectedKeys={[pathname]}
                        items={menuItems.map((item) => ({
                            key: item.key,
                            label: (
                                <Link href={item.key} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '16px', fontWeight: 500, color: 'inherit' }}>
                                    {item.label}
                                </Link>
                            ),
                            children: item.children
                        }))}
                        style={{ borderRight: 'none' }}
                    />
                </ConfigProvider>
            </Drawer>
        </AntHeader>
    );
};

export default Header;