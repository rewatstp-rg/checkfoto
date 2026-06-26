import {
    Box,
    Typography
} from "@mui/material";

import { useLocales } from "src/locales";

const termsTh = {
    title: "นโยบายความเป็นส่วนตัว (Privacy Policy)",
    effectiveDate: [
        "<b>วันที่มีผลบังคับใช้: 1 กันยายน 2568</b>",
        "<b>checkfoto.com</b> (“เรา” “เว็บไซต์” หรือ “บริษัท”) ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้งาน และมุ่งมั่นในการปกป้องข้อมูลส่วนบุคคลของคุณอย่างสูงสุด นโยบายนี้อธิบายถึงวิธีการที่เราเก็บรวบรวม ใช้ เก็บรักษา และคุ้มครองข้อมูลส่วนบุคคลของคุณ เมื่อคุณเข้าใช้งานเว็บไซต์และบริการของเราโดยการเข้าใช้งาน<b>checkfoto.com</b>  ถือว่าคุณได้ยินยอมตามนโยบายนี้"
    ],
    sections: [
        {
            heading: "1. ข้อมูลที่เราเก็บรวบรวม",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "เราเก็บเฉพาะข้อมูลที่จำเป็นต่อการให้บริการและพัฒนาระบบ โดยแบ่งออกเป็นดังนี้:",
                subHeading: "1.1 ข้อมูลส่วนบุคคล (Personal Information)",
                sub: [
                    {
                        isDose: false,
                        subTitle: "",
                        item: [
                            {
                                isDose: true,
                                constent: "ชื่อ-นามสกุล",
                            },
                            {
                                isDose: true,
                                constent: "ที่อยู่อีเมล",
                            },
                            {
                                isDose: true,
                                constent: "หมายเลขโทรศัพท์ (ถ้ามี)",
                            },
                            {
                                isDose: true,
                                constent: "ข้อมูลการชำระเงิน (ซึ่งดำเนินการผ่านระบบชำระเงินที่ปลอดภัยโดยผู้ให้บริการบุคคลที่สาม)",
                            }
                        ]
                    }
                ]
            },
            {
                contect: "1.2 ข้อมูลชีวภาพ / ข้อมูลใบหน้า (Facial Data)",
                subHeading: "",
                isDose: false,
                sub: [
                    {
                        isDose: false,
                        subTitle: "",
                        item: [
                            {
                                isDose: true,
                                constent: "ภาพใบหน้าหรือข้อมูลทางชีวภาพที่ใช้สำหรับ <b>เทคโนโลยีการจดจำใบหน้า (Face Recognition)</b>",
                            },
                            {
                                isDose: true,
                                constent: "ใช้เพื่อค้นหาและยืนยันภาพถ่ายของคุณจากกิจกรรมหรืองานอีเว้นท์เท่านั้น",
                            },
                            {
                                isDose: true,
                                constent: "ข้อมูลนี้จะถูกประมวลผลและเก็บรักษาอย่างปลอดภัย ไม่ถูกนำไปใช้อย่างอื่น",
                            }
                        ]
                    }
                ]
            },
            {
                isDose: false,
                subHeading: "",
                contect: "1.3 ข้อมูลที่ไม่ระบุตัวบุคคล (Non-Personal Information)",
                sub: [
                    {
                        isDose: false,
                        subTitle: "",
                        item: [
                            {
                                isDose: true,
                                constent: "ที่อยู่ IP",
                            },
                            {
                                isDose: true,
                                constent: "ประเภทและเวอร์ชันของเบราว์เซอร์",
                            },
                            {
                                isDose: true,
                                constent: "ข้อมูลอุปกรณ์ และข้อมูลการใช้งานเว็บไซต์ เพื่อปรับปรุงประสิทธิภาพและประสบการณ์การใช้งาน",
                            }
                        ]
                    }
                ]
            }]
        },
        {
            heading: "2. วัตถุประสงค์ของการเก็บและใช้ข้อมูล",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "ข้อมูลที่เราเก็บรวบรวมจะถูกใช้เพื่อ:",
                subHeading: "",
                sub: [
                    {
                        isDose: false,
                        subTitle: "",
                        item: [
                            {
                                isDose: false,
                                constent: "1. ระบุตัวตนและค้นหาภาพถ่ายของผู้ใช้งานอย่างแม่นยำผ่าน <b>Face Recognition</b>",
                            },
                            {
                                isDose: false,
                                constent: "2. ดำเนินการสั่งซื้อและจัดส่งไฟล์ภาพดิจิทัล",
                            },
                            {
                                isDose: false,
                                constent: "3. ตรวจสอบสิทธิ์และป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต",
                            },
                            {
                                isDose: false,
                                constent: "4. ปรับปรุงคุณภาพของเว็บไซต์และบริการ",
                            },
                            {
                                isDose: false,
                                constent: "5. ปฏิบัติตามข้อกำหนดทางกฎหมายและแก้ไขข้อพิพาท",
                            }
                        ]
                    }
                ]
            },

            ]
        },
        {
            heading: "3. การเปิดเผยข้อมูลต่อบุคคลภายนอก",
            subHeading: "",
            content: [
                {
                    isDose: false,
                    contect: "เรา <b>จะไม่ขาย เช่า หรือแลกเปลี่ยนข้อมูลส่วนบุคคลของคุณ</b> กับบุคคลภายนอก ยกเว้นในกรณีดังต่อไปนี้:",
                    subHeading: "",
                    sub: [
                        {
                            isDose: false,
                            subTitle: "1. <b>ตามกฎหมาย</b> – เมื่อมีกฎหมาย คำสั่งศาล หรือข้อบังคับของหน่วยงานรัฐกำหนด",
                            item: []
                        },
                        {
                            isDose: false,
                            subTitle: "2. <b>ผู้ให้บริการที่เกี่ยวข้อง (Third-Party Service Providers)</b> เช่น:",
                            item: [
                                {
                                    isDose: true,
                                    constent: "ผู้ให้บริการระบบชำระเงิน",
                                },
                                {
                                    isDose: true,
                                    constent: "ผู้ให้บริการจัดเก็บและปกป้องข้อมูล",
                                },
                                {
                                    isDose: true,
                                    constent: "ผู้ให้บริการลูกค้าสัมพันธ์",
                                },
                            ]
                        },
                        {
                            isDose: false,
                            subTitle: "3. <b>ได้รับความยินยอมจากผู้ใช้งาน</b> – เมื่อคุณอนุญาตอย่างชัดเจนให้เปิดเผยข้อมูล",
                            item: []
                        },
                        {
                            isDose: false,
                            subTitle: "ผู้ให้บริการบุคคลที่สามเหล่านี้จะต้องปฏิบัติตามสัญญาการรักษาความลับและมาตรฐานการปกป้องข้อมูลที่เข้มงวด",
                            item: []
                        },
                    ]
                }
            ]
        },
        {
            heading: "4. มาตรการรักษาความปลอดภัยของข้อมูล",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "เราใช้มาตรการรักษาความปลอดภัยตามมาตรฐานสากลเพื่อปกป้องข้อมูลส่วนบุคคล เช่น:",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "การเข้ารหัสข้อมูล (SSL Encryption) สำหรับการส่งข้อมูล",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "เซิร์ฟเวอร์ที่มีระบบป้องกันความปลอดภัยสูง",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "การจำกัดสิทธิ์การเข้าถึงข้อมูลเฉพาะบุคคลที่เกี่ยวข้อง",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "การตรวจสอบและทดสอบระบบเป็นประจำ",
                        item: []
                    }
                ]
            }
            ]
        },
        {
            heading: "หมายเหตุ:",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "แม้เราจะมีมาตรการความปลอดภัยที่รัดกุม แต่ไม่มีระบบใดที่ปลอดภัย 100% ผู้ใช้งานจึงควรเก็บรักษารหัสผ่านและข้อมูลบัญชีให้เป็นความลับด้วยตนเอง",
                subHeading: "",
                sub: []
            }]
        },
        {
            heading: "5. สิทธิของผู้ใช้งาน (User Rights)",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "คุณมีสิทธิ์เกี่ยวกับข้อมูลส่วนบุคคลของคุณ ดังนี้:",
                subHeading: "",
                sub: [
                    {
                        isDose: false,
                        subTitle: "1. <b>ขอเข้าถึงข้อมูล</b> – ขอสำเนาข้อมูลที่เราเก็บเกี่ยวกับคุณ",
                        item: []
                    },
                    {
                        isDose: false,
                        subTitle: "2. <b>แก้ไขข้อมูล</b> – ปรับปรุงหรือแก้ไขข้อมูลที่ไม่ถูกต้องหรือไม่เป็นปัจจุบัน",
                        item: []
                    },
                    {
                        isDose: false,
                        subTitle: "3. <b>ลบข้อมูล</b> – ขอให้ลบบัญชีและข้อมูลที่เกี่ยวข้องทั้งหมด",
                        item: []
                    },
                    {
                        isDose: false,
                        subTitle: "4. <b>ถอนความยินยอม</b> – ยกเลิกความยินยอมในการใช้หรือประมวลผลข้อมูล",
                        item: []
                    }
                ]
            },
            {
                isDose: false,
                contect: "เพื่อดำเนินการตามสิทธิ์เหล่านี้ กรุณาติดต่อ <b>support@checkfoto.com</b>",
                subHeading: "",
                sub: []
            }]
        },
        {
            heading: "6. ระยะเวลาในการเก็บรักษาข้อมูล",
            subHeading: "",
            content: [
                {
                    isDose: true,
                    contect: "",
                    subHeading: "เราจะเก็บรักษาข้อมูลส่วนบุคคลและข้อมูลใบหน้า เฉพาะเท่าที่จำเป็น เพื่อให้บริการและปฏิบัติตามวัตถุประสงค์ที่ระบุไว้ในนโยบายนี้",
                    sub: []
                },
                {
                    isDose: true,
                    contect: "",
                    subHeading: "เมื่อข้อมูลไม่จำเป็นต้องใช้งานแล้ว เราจะดำเนินการลบหรือทำให้ข้อมูลเป็นแบบไม่ระบุตัวบุคคลอย่างปลอดภัย",
                    sub: []
                }
            ]
        },
        {
            heading: "7. การใช้คุกกี้ (Cookies) และเทคโนโลยีติดตาม",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "เว็บไซต์ของเราอาจใช้ <b>คุกกี้ (Cookies)</b> และเทคโนโลยีติดตามอื่น ๆ เพื่อ:",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "จดจำการเข้าสู่ระบบของผู้ใช้งาน",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "วิเคราะห์การใช้งานเว็บไซต์และปรับปรุงประสบการณ์การใช้งาน",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "จัดเก็บค่าการตั้งค่าของผู้ใช้งาน",
                        item: []
                    }
                ]
            },
            {
                isDose: false,
                contect: "คุณสามารถปิดการใช้งานคุกกี้ได้ผ่านการตั้งค่าเบราว์เซอร์ แต่บางฟังก์ชันของเว็บไซต์อาจทำงานได้ไม่สมบูรณ์",
                subHeading: "",
                sub: []
            }]
        },
        {
            heading: "8. การคุ้มครองข้อมูลของผู้เยาว์",
            subHeading: "",
            content: [{
                isDose: true,
                contect: "",
                subHeading: "บริการของเราไม่ได้มีวัตถุประสงค์สำหรับบุคคลที่มีอายุต่ำกว่า <b>18 ปี</b>",
                sub: []
            },
            {
                isDose: true,
                contect: "",
                subHeading: "เราไม่เก็บรวบรวมหรือประมวลผลข้อมูลของผู้เยาว์โดยเจตนา",
                sub: []
            },
            {
                isDose: true,
                contect: "",
                subHeading: "หากพบว่ามีข้อมูลของผู้เยาว์ถูกเก็บไว้โดยไม่ตั้งใจ เราจะดำเนินการลบข้อมูลนั้นทันที",
                sub: []
            }
            ]
        },
        {
            heading: "9. การโอนข้อมูลไปต่างประเทศ",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "ในบางกรณี ข้อมูลของคุณอาจถูกโอนไปยังเซิร์ฟเวอร์ที่อยู่นอกประเทศไทย เราจะดำเนินการภายใต้มาตรการปกป้องข้อมูลที่เหมาะสมตามกฎหมายที่เกี่ยวข้อ",
                subHeading: "",
                sub: []
            }
            ]
        },
        {
            heading: "10. การเปลี่ยนแปลงนโยบายความเป็นส่วนตัว",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "เราอาจปรับปรุงหรือแก้ไขนโยบายความเป็นส่วนตัวนี้ตามความเหมาะสม",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "การเปลี่ยนแปลงจะมีผลทันทีเมื่อประกาศบนเว็บไซต์พร้อมระบุ <b>วันที่มีผลบังคับใช้ใหม่</b>",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "การใช้งานเว็บไซต์ต่อหลังการเปลี่ยนแปลงถือว่าผู้ใช้งานยินยอมตามนโยบายที่ปรับปรุงแล้ว",
                        item: []
                    }
                ]
            }
            ]
        },
        {
            heading: "11. ช่องทางการติดต่อ",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "หากมีข้อสงสัยหรือข้อร้องเรียนเกี่ยวกับนโยบายนี้ กรุณาติดต่อเราได้ที่:",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "<b>อีเมล:</b> info@checkfoto.com",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "<b>โทรศัพท์:</b> +66 610104669",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "<b>เว็บไซต์:</b> www.checkfoto.com",
                        item: []
                    }
                ]
            }
            ]
        }
    ]
};

const termsEn = {
    title: "Privacy Policy",
    effectiveDate: [
        "Effective Date: 1 September 2025",
        "<b>checkfoto.com</b>  (“we,” “our,” or “us”) values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you access and use our website and services. By using <b>checkfoto.com</b>, you consent to the practices described in this policy."
    ],
    sections: [
        {
            heading: "1. Information We Collect",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "We collect only the information necessary to provide and improve our services, including:",
                subHeading: "1.1 Personal Information",
                sub: [
                    {
                        isDose: false,
                        subTitle: "",
                        item: [
                            {
                                isDose: true,
                                constent: "Full name",
                            },
                            {
                                isDose: true,
                                constent: "Email address",
                            },
                            {
                                isDose: true,
                                constent: "Phone number (if applicable)",
                            },
                            {
                                isDose: true,
                                constent: "Payment details (processed securely by third-party payment providers)",
                            }
                        ]
                    }
                ]
            },
            {
                contect: "1.2 Facial Data",
                subHeading: "",
                isDose: false,
                sub: [
                    {
                        isDose: false,
                        subTitle: "",
                        item: [
                            {
                                isDose: true,
                                constent: "Facial images or biometric data submitted for the purpose of identifying and retrieving personal event photos through <b>Face Recognition technology.</b>",
                            },
                            {
                                isDose: true,
                                constent: "This data is processed securely and used only for the intended purpose.",
                            },
                        ]
                    }
                ]
            },
            {
                isDose: false,
                subHeading: "",
                contect: "1.3 Non-Personal Information",
                sub: [
                    {
                        isDose: false,
                        subTitle: "",
                        item: [
                            {
                                isDose: true,
                                constent: "IP address",
                            },
                            {
                                isDose: true,
                                constent: "Browser type and version",
                            },
                            {
                                isDose: true,
                                constent: "Device information and usage data, collected to improve user experience and site performance.",
                            }
                        ]
                    }
                ]
            }]
        },
        {
            heading: "2. Purpose of Data Collection",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "We collect and process your data for the following purposes:",
                subHeading: "",
                sub: [
                    {
                        isDose: false,
                        subTitle: "",
                        item: [
                            {
                                isDose: false,
                                constent: "1. To identify and retrieve your personal event photos accurately using <b>Face Recognition technology</b>.",
                            },
                            {
                                isDose: false,
                                constent: "2. To process transactions and deliver purchased digital files securely.",
                            },
                            {
                                isDose: false,
                                constent: "3. To verify your identity and prevent unauthorized access.",
                            },
                            {
                                isDose: false,
                                constent: "4. To enhance and improve our website and services.",
                            },
                            {
                                isDose: false,
                                constent: "5. To comply with legal obligations and resolve disputes.",
                            }
                        ]
                    }
                ]
            },

            ]
        },
        {
            heading: "3. Data Sharing and Disclosure",
            subHeading: "",
            content: [
                {
                    isDose: false,
                    contect: "We respect your privacy and will <b>not sell, rent, or share your personal data</b> with third parties, except in the following situations:",
                    subHeading: "",
                    sub: [
                        {
                            isDose: false,
                            subTitle: "1. <b>Legal Compliance</b> – When required by law, court order, or government regulations.",
                            item: []
                        },
                        {
                            isDose: false,
                            subTitle: "2. <b>Service Providers</b> – Limited access may be provided to trusted third-party vendors who assist with:",
                            item: [
                                {
                                    isDose: true,
                                    constent: "Payment processing",
                                },
                                {
                                    isDose: true,
                                    constent: "Data storage and security",
                                },
                                {
                                    isDose: true,
                                    constent: "Customer support",
                                },
                            ]
                        },
                        {
                            isDose: false,
                            subTitle: "3. <b>Consent-Based Sharing</b> – When you have explicitly given consent for your data to be shared.",
                            item: []
                        },
                        {
                            isDose: false,
                            subTitle: "All third-party partners are required to comply with strict data protection and confidentiality agreements.",
                            item: []
                        },
                    ]
                }
            ]
        },
        {
            heading: "4. Data Security",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "We implement industry-standard security measures to protect your data, including:",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "SSL encryption for data transmission",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "Secure server environments",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "Access controls to limit data exposure",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "Regular security audits and monitoring",
                        item: []
                    }
                ]
            }
            ]
        },
        {
            heading: "",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "Despite our efforts, no system can be completely secure. Users are encouraged to maintain strong passwords and protect their account information.",
                subHeading: "",
                sub: []
            }]
        },
        {
            heading: "5. User Rights",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "You have the following rights regarding your personal data, in compliance with applicable laws such as Thailand’s <b>PDPA:</b>",
                subHeading: "",
                sub: [
                    {
                        isDose: false,
                        subTitle: "1. <b>Access</b> – Request a copy of the data we hold about you.",
                        item: []
                    },
                    {
                        isDose: false,
                        subTitle: "2. <b>Correction</b> – Update or correct inaccurate or outdated information.",
                        item: []
                    },
                    {
                        isDose: false,
                        subTitle: "3. <b>Deletion</b> – Request deletion of your account and all associated data.",
                        item: []
                    },
                    {
                        isDose: false,
                        subTitle: "4. <b>Withdrawal of Consent</b> – Revoke previously granted permissions regarding data processing.",
                        item: []
                    }
                ]
            },
            {
                isDose: false,
                contect: "To exercise these rights, please contact us at <b>support@checkfoto.com</b>",
                subHeading: "",
                sub: []
            }]
        },
        {
            heading: "6. Data Retention",
            subHeading: "",
            content: [
                {
                    isDose: true,
                    contect: "",
                    subHeading: "Personal data, including facial recognition data, will be retained only as long as necessary to fulfill the purposes stated in this policy.",
                    sub: []
                },
                {
                    isDose: true,
                    contect: "",
                    subHeading: "When no longer required, data will be securely deleted or anonymized.",
                    sub: []
                }
            ]
        },
        {
            heading: "7.  Use of Cookies and Tracking Technologies",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "Our website may use cookies and similar technologies to:",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "Improve user experience",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "Remember login sessions",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "Analyze site traffic and usage trends",
                        item: []
                    }
                ]
            },
            {
                isDose: false,
                contect: "You may disable cookies through your browser settings, but this may affect the functionality of certain services.",
                subHeading: "",
                sub: []
            }]
        },
        {
            heading: "8. Children’s Privacy",
            subHeading: "",
            content: [{
                isDose: true,
                contect: "",
                subHeading: "Our services are not intended for individuals under <b>18 years of age.</b>",
                sub: []
            },
            {
                isDose: true,
                contect: "",
                subHeading: "We do not knowingly collect personal data from minors.",
                sub: []
            },
            {
                isDose: true,
                contect: "",
                subHeading: "If we become aware of any such data, we will promptly delete it.",
                sub: []
            }
            ]
        },
        {
            heading: "9. International Data Transfers",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "If data is transferred outside of Thailand, we will ensure appropriate safeguards are in place to protect your privacy in compliance with relevant data protection laws.",
                subHeading: "",
                sub: []
            }
            ]
        },
        {
            heading: "10. Changes to This Privacy Policy",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "We reserve the right to update this Privacy Policy at any time to reflect changes in our practices, legal requirements, or service offerings.",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "Updates will be posted on this page with a revised “Effective Date.”",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "Continued use of our services after changes take effect constitutes acceptance of the updated policy.",
                        item: []
                    }
                ]
            }
            ]
        },
        {
            heading: "11. Contact Us",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us:",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "<b>Email:</b> info@checkfoto.com",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "<b>Phone:</b> +66 610104669",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "<b>Website:</b> www.checkfoto.com",
                        item: []
                    }
                ]
            }
            ]
        }
    ]
};

export default function PrivacyPolicyContent() {
    const { currentLang } = useLocales();
    const terms = currentLang.value === "th" ? termsTh : termsEn;

    return (
        <>
            {/* หัวข้อหลัก */}
            <Typography variant="h4" gutterBottom>
                {terms.title}
            </Typography>

            {/* effectiveDate */}
            {terms?.effectiveDate?.map((line, idx) => (
                <Typography
                    key={idx}
                    variant="body1"
                    paragraph
                    mb={0}
                    dangerouslySetInnerHTML={{ __html: line }}
                />
            ))}

            {/* รายละเอียดเนื้อหา */}
            {terms.sections.map((section, index) => (
                <Box key={index} mb={3} mt={1}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        dangerouslySetInnerHTML={{ __html: section.heading }}
                    />

                    {section.content.map((line, idx) => (
                        <Box key={idx}>
                            {/* ข้อความหลัก */}
                            <Typography
                                variant="body1"
                                ml={1}
                                gutterBottom
                                paragraph
                                dangerouslySetInnerHTML={{ __html: line.contect }}
                            />

                            <Typography
                                variant="body1"
                                ml={1}
                                gutterBottom
                                paragraph
                                sx={line.isDose ? { ml: 3, '&::before': { content: '"• "', marginRight: '4px' } } : { ml: 1 }}
                                dangerouslySetInnerHTML={{ __html: line.subHeading }}
                            />

                            {/* ตรวจสอบ sub */}
                            {line?.sub?.map((subLine, subIdx) => (
                                <Box key={subIdx}>
                                    <Typography
                                        variant="body1"
                                        ml={1}
                                        gutterBottom
                                        paragraph
                                        sx={subLine.isDose ? { ml: 5, '&::before': { content: '"• "', marginRight: '4px' } } : { ml: 3 }}
                                        dangerouslySetInnerHTML={{ __html: subLine.subTitle }}
                                    />
                                    {subLine?.item?.map((item, itemIdx) => (
                                        <Typography
                                            key={itemIdx}
                                            variant="body1"
                                            paragraph
                                            dangerouslySetInnerHTML={{ __html: item.constent }}
                                            sx={item.isDose ? { ml: 5, '&::before': { content: '"• "', marginRight: '4px' } } : { ml: 3 }}
                                        />
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
            ))}
        </>
    );
}