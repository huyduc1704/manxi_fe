'use client';

import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
            <Header />
            <Content style={{ flex: 1, background: '#ffffff' }}>
                {children}
            </Content>
            <Footer />
        </Layout>
    );
};

export default AppLayout;
