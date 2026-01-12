'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function ContactPage() {
    const t = useTranslations('Header');

    return (
        <div style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <Title level={1}>{t('contact')}</Title>
            <Paragraph>Liên hệ với chúng tôi để được tư vấn và hỗ trợ.</Paragraph>
        </div>
    );
}
