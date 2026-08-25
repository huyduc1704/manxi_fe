'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, DatePicker, TimePicker, Checkbox, Card, Steps, message, Typography, Divider, Row, Col, Space, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import { Service, ServiceCategory, getServices, getServiceCategories, createBooking, CreateBookingDto } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const { Title, Text } = Typography;
const { TextArea } = Input;

type BookingFormData = {
    serviceIds: string[];
    bookingDate: dayjs.Dayjs;
    bookingTime: dayjs.Dayjs;
    fullName: string;
    phone: string;
    email: string;
    customerNote: string;
};

export default function BookingForm() {
    const t = useTranslations('BookingForm');
    const [services, setServices] = useState<Service[]>([]);
    const [categories, setCategories] = useState<ServiceCategory[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();

    const { control, handleSubmit, watch, trigger, setValue } = useForm<BookingFormData>({
        defaultValues: {
            serviceIds: [],
        }
    });

    const watchedServices = watch('serviceIds');

    useEffect(() => {
        async function fetchData() {
            try {
                const [servicesData, categoriesData] = await Promise.all([
                    getServices(),
                    getServiceCategories()
                ]);
                setServices(servicesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Failed to load booking data', error);
                messageApi.error(t('messages.error_load'));
            }
        }
        fetchData();
    }, []);

    const onSubmit = async (data: BookingFormData) => {
        setLoading(true);
        try {
            const bookingPayload: CreateBookingDto = {
                bookingType: 'GUEST',
                guestInfo: {
                    fullName: data.fullName,
                    phone: data.phone,
                    email: data.email,
                },
                serviceIds: data.serviceIds,
                bookingDate: data.bookingDate.format('YYYY-MM-DD'),
                bookingTime: data.bookingTime.format('HH:mm'),
                customerNote: data.customerNote,
            };

            await createBooking(bookingPayload);
            messageApi.success(t('messages.success'));
            router.push('/'); // Redirect to home or a success page
        } catch (error: any) {
            messageApi.error(error.message || t('messages.create_error'));
        } finally {
            setLoading(false);
        }
    };

    const next = async () => {
        let valid = false;
        if (currentStep === 0) {
            valid = await trigger('serviceIds');
            if (watchedServices.length === 0) {
                messageApi.error(t('messages.service_required'));
                return;
            }
        } else if (currentStep === 1) {
            valid = await trigger(['bookingDate', 'bookingTime']);
        } else if (currentStep === 2) {
            valid = await trigger(['fullName', 'phone', 'email']);
        }

        if (valid) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prev = () => {
        setCurrentStep(currentStep - 1);
    };

    const getSelectedServicesDetails = () => {
        return services.filter(s => watchedServices.includes(s._id));
    };

    const calculateTotal = () => {
        return getSelectedServicesDetails().reduce((acc, curr) => acc + curr.price, 0);
    };

    const steps = [
        {
            title: t('steps.selectServices'),
            content: (
                <div className="space-y-6">
                    {categories.map(category => {
                        const categoryServices = services.filter(s => {
                            // Try to match by ID first
                            if ((typeof s.category === 'string' ? s.category : s.category?._id) === category._id) {
                                return true;
                            }
                            // Fallback to slug match if available (common in some API setups)
                            if (s.categorySlug && s.categorySlug === category.slug) {
                                return true;
                            }
                            return false;
                        });

                        if (categoryServices.length === 0) return null;

                        return (
                            <div key={category._id} className="mb-8">
                                <Title level={5} className="mb-4 text-[#6D5B4B] font-serif border-l-4 border-[#6D5B4B] pl-3">
                                    {category.name}
                                </Title>
                                <Controller
                                    name="serviceIds"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox.Group {...field} className="w-full">
                                            <Row gutter={[16, 16]}>
                                                {categoryServices.map(service => {
                                                    const isSelected = watchedServices.includes(service._id);
                                                    return (
                                                        <Col span={24} md={12} key={service._id}>
                                                            <div
                                                                className={`p-4 border rounded-xl transition-all duration-200 cursor-pointer ${isSelected
                                                                    ? 'border-[#6D5B4B] bg-[#6D5B4B]/5 shadow-md'
                                                                    : 'border-gray-200 hover:border-[#6D5B4B]/50 hover:shadow-sm'
                                                                    }`}
                                                                onClick={() => {
                                                                    const newValue = isSelected
                                                                        ? watchedServices.filter(id => id !== service._id)
                                                                        : [...watchedServices, service._id];
                                                                    field.onChange(newValue);
                                                                }}
                                                            >
                                                                <div className="flex items-start gap-3">
                                                                    <Checkbox
                                                                        value={service._id}
                                                                        checked={isSelected}
                                                                        style={{ marginTop: 4 }}
                                                                    />
                                                                    <div className="flex-1">
                                                                        <div className="flex justify-between items-start mb-1">
                                                                            <Text strong className={isSelected ? 'text-[#6D5B4B]' : 'text-gray-800'}>
                                                                                {service.name}
                                                                            </Text>
                                                                            <Text className="text-[#6D5B4B] font-semibold">
                                                                                {service.price.toLocaleString()}đ
                                                                            </Text>
                                                                        </div>
                                                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                                                            {service.duration} {t('services.duration')}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    );
                                                })}
                                            </Row>
                                        </Checkbox.Group>
                                    )}
                                />
                            </div>
                        );
                    })}
                </div>
            ),
        },
        {
            title: t('steps.dateTime'),
            content: (
                <div className="max-w-md mx-auto space-y-6 pt-4">
                    <Form.Item label={t('dateTime.selectDate')} required className="mb-0">
                        <Controller
                            name="bookingDate"
                            control={control}
                            rules={{ required: t('dateTime.requiredDate') }}
                            render={({ field, fieldState }) => (
                                <>
                                    <DatePicker
                                        {...field}
                                        className="w-full h-11"
                                        disabledDate={(current) => current && current < dayjs().startOf('day')}
                                    />
                                    {fieldState.error && <span className="text-red-500 text-sm mt-1 block">{fieldState.error.message}</span>}
                                </>
                            )}
                        />
                    </Form.Item>
                    <Form.Item label={t('dateTime.selectTime')} required className="mb-0">
                        <Controller
                            name="bookingTime"
                            control={control}
                            rules={{ required: t('dateTime.requiredTime') }}
                            render={({ field, fieldState }) => (
                                <>
                                    <TimePicker
                                        {...field}
                                        format="HH:mm"
                                        className="w-full h-11"
                                        minuteStep={15}
                                        disabledTime={() => ({
                                            disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 22, 23],
                                        })}
                                        showNow={false}
                                    />
                                    {fieldState.error && <span className="text-red-500 text-sm mt-1 block">{fieldState.error.message}</span>}
                                </>
                            )}
                        />
                    </Form.Item>
                </div>
            ),
        },
        {
            title: t('steps.yourDetails'),
            content: (
                <div className="max-w-md mx-auto space-y-4 pt-4">
                    <Controller
                        name="fullName"
                        control={control}
                        rules={{ required: t('details.requiredName') }}
                        render={({ field, fieldState }) => (
                            <Form.Item label={t('details.fullName')} validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message} required>
                                <Input {...field} placeholder="Nguyễn Văn A" size="large" />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        rules={{ required: t('details.requiredPhone'), pattern: { value: /^[0-9]+$/, message: t('details.invalidPhone') } }}
                        render={({ field, fieldState }) => (
                            <Form.Item label={t('details.phone')} validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message} required>
                                <Input {...field} placeholder="0912345678" size="large" />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Form.Item label={t('details.email')}>
                                <Input {...field} placeholder="username@gmail.com" type="email" size="large" />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="customerNote"
                        control={control}
                        render={({ field }) => (
                            <Form.Item label={t('details.note')}>
                                <TextArea {...field} rows={4} placeholder={t('details.notePlaceholder')} />
                            </Form.Item>
                        )}
                    />
                </div>
            ),
        },
        {
            title: t('steps.confirm'),
            content: (
                <div className="max-w-xl mx-auto">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <Title level={3} className="text-center mb-8 !font-serif text-[#6D5B4B]">{t('summary.title')}</Title>

                        <div className="space-y-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-[#6D5B4B]/10 flex items-center justify-center text-[#6D5B4B]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">{t('summary.dateTime')}</div>
                                        <Text strong className="text-lg text-[#6D5B4B]">
                                            {watch('bookingDate')?.format('DD/MM/YYYY')}
                                            <span className="mx-2 text-gray-300">|</span>
                                            {watch('bookingTime')?.format('HH:mm')}
                                        </Text>
                                    </div>
                                </div>
                            </div>

                            <Divider className="my-6" />

                            <div>
                                <Text strong className="block mb-4 text-gray-600 uppercase text-xs tracking-wider">{t('summary.selectedServices')}</Text>
                                <div className="space-y-3">
                                    {getSelectedServicesDetails().map(s => (
                                        <div key={s._id} className="flex justify-between items-center group">
                                            <span className="text-gray-700 group-hover:text-[#6D5B4B] transition-colors">{s.name}</span>
                                            <span className="font-medium">{s.price.toLocaleString()}đ</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Divider className="border-dashed my-6" />

                            <div className="flex justify-between items-end">
                                <span className="text-gray-600">{t('summary.totalEstimated')}</span>
                                <Text className="text-2xl font-bold text-[#6D5B4B]">{calculateTotal().toLocaleString()}đ</Text>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A7.502 7.502 0 014.303 5.97 7.502 7.502 0 0114.998 0a7.502 7.502 0 01-.437 14.148z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">{t('summary.customer')}</span>
                                        <Text strong>{watch('fullName')} - {watch('phone')}</Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#6D5B4B',
                    borderRadius: 8,
                },
                components: {
                    Steps: {
                        colorPrimary: '#6D5B4B',
                        algorithm: true,
                    },
                    Button: {
                        primaryShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',
                    },
                    Input: {
                        activeBorderColor: '#6D5B4B',
                        hoverBorderColor: '#8E7763',
                    }
                }
            }}
        >
            <div className="w-full">
                {contextHolder}
                <div className="mb-10 px-4">
                    <Steps
                        current={currentStep}
                        items={steps.map(item => ({ title: item.title }))}
                        className="custom-steps"
                    />
                </div>

                <div className="min-h-[400px] mb-8 px-4">
                    {steps[currentStep].content}
                </div>

                <div className="flex justify-between mt-12 px-4 border-t pt-6 bg-white sticky bottom-0 z-10 pb-4 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
                    {currentStep > 0 && (
                        <Button
                            onClick={() => prev()}
                            size="large"
                            className="hover:!text-[#6D5B4B] hover:!border-[#6D5B4B]"
                        >
                            {t('buttons.previous')}
                        </Button>
                    )}
                    {currentStep < steps.length - 1 && (
                        <Button
                            type="primary"
                            onClick={() => next()}
                            className="ml-auto shadow-md"
                            size="large"
                        >
                            {t('buttons.next')}
                        </Button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <Button
                            type="primary"
                            onClick={handleSubmit(onSubmit)}
                            loading={loading}
                            className="ml-auto shadow-md"
                            size="large"
                        >
                            {t('buttons.confirm')}
                        </Button>
                    )}
                </div>
            </div>
        </ConfigProvider>
    );
}
