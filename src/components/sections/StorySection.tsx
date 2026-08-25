'use client';

import React from 'react';
import { Typography, Button, Card } from 'antd';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

const { Title, Text } = Typography;

import { BLOGS } from '@/data/blogs';

const ASPECT_RATIOS = ['3/4', '4/3', '1/1', '3/5', '3/2', '3/4'];

const STORIES = BLOGS.slice(0, 6).map((blog, index) => ({
    id: Number(blog.id), // Convert string id to number if necessary for key, or keep as is. Original was number.
    category: 'GÓC NHỎ MẠN KHÊ',
    date: blog.date,
    title: blog.title,
    image: blog.thumbnail,
    aspectRatio: ASPECT_RATIOS[index] || '3/4',
}));

const StorySection = () => {
    return (
        <section style={{
            backgroundColor: '#F5F2EA', // Cream/Beige background
            padding: '80px 20px',
            overflow: 'hidden'
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
                <Title level={2} style={{
                    textAlign: 'center',
                    fontFamily: 'serif',
                    fontWeight: 400,
                    fontSize: '42px',
                    marginBottom: '50px',
                    color: '#3e3a36'
                }}>
                    Góc nhỏ Mạn Khê
                </Title>

                {/* Masonry Layout Container */}
                <div style={{ padding: '0 20px' }}>

                    {/* CSS Grid/Masonry Fallback using Columns */}
                    <style jsx>{`
                        .masonry-grid {
                            column-count: 3;
                            column-gap: 20px;
                        }
                        @media (max-width: 1024px) {
                            .masonry-grid {
                                column-count: 2;
                            }
                        }
                        @media (max-width: 600px) {
                            .masonry-grid {
                                column-count: 1;
                            }
                        }
                        .masonry-item {
                            break-inside: avoid;
                            margin-bottom: 20px;
                            transition: transform 0.3s ease;
                        }
                        .masonry-item:hover {
                            transform: translateY(-5px);
                        }
                    `}</style>

                    <div className="masonry-grid">
                        {STORIES.map((story) => (
                            <div key={story.id} className="masonry-item">
                                <Card
                                    variant="borderless"
                                    styles={{ body: { padding: '20px' } }}
                                    style={{
                                        borderRadius: '2px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                        overflow: 'hidden',
                                        backgroundColor: '#e0dbcdff'
                                    }}
                                >
                                    <div style={{
                                        position: 'relative',
                                        width: '100%',
                                        aspectRatio: story.aspectRatio,
                                        marginBottom: '20px',
                                        overflow: 'hidden',
                                        borderRadius: '2px'
                                    }}>
                                        <Image
                                            src={story.image}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            alt={story.title}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '8px' }}>
                                        <Text style={{
                                            fontSize: '11px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            color: '#666'
                                        }}>
                                            {story.category} <span style={{ margin: '0 5px' }}>|</span> {story.date}
                                        </Text>
                                    </div>

                                    <Title level={4} style={{
                                        fontFamily: 'serif',
                                        fontWeight: 400,
                                        fontSize: '18px',
                                        lineHeight: '1.4',
                                        margin: 0,
                                        color: '#3e3a36',
                                    }}>
                                        {story.title}
                                    </Title>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Link href="/blog">
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
                                height: '40px',
                                padding: '0 30px',
                                borderRadius: '0'
                            }}
                        >
                            Xem tất cả
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default StorySection;
