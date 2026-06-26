import { Box, Typography } from "@mui/material";

import { useLocales } from "src/locales";

const termsTh = {
    title: "ข้อกำหนดและเงื่อนไขการใช้งาน (Terms of Use)",
    effectiveDate: ["ยินดีต้อนรับสู่ <b>checkfoto.com</b> แพลตฟอร์มจำหน่ายภาพถ่ายจากงานอีเว้นท์ กีฬา การแข่งขัน และกิจกรรมบันเทิงต่าง ๆ ด้วยเทคโนโลยี <b>Face Recognition</b>", "การเข้าใช้งานเว็บไซต์นี้ถือว่าผู้ใช้งานได้ยอมรับและตกลงปฏิบัติตามข้อกำหนดดังต่อไปนี้"],
    sections: [
        {
            heading: "1. การให้บริการ",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "1.1 <b>checkfoto.com</b> ให้บริการจัดเก็บและจำหน่ายภาพถ่ายของผู้เข้าร่วมกิจกรรม โดยใช้เทคโนโลยีตรวจจับใบหน้า (Face Recognition) เพื่อค้นหาภาพที่เกี่ยวข้องกับผู้ใช้งานอย่างแม่นยำและปลอดภัย",
                subHeading: "",
                sub: []
            },
            {
                contect: "1.2 การใช้งานเว็บไซต์นี้มีจุดประสงค์เพื่อ:",
                subHeading: "",
                isDose: false,
                sub: [
                    {
                        isDose: false,
                        subTitle: "",
                        item: [
                            {
                                isDose: true,
                                constent: "ค้นหาภาพถ่ายของผู้เข้าร่วมกิจกรรม",
                            },
                            {
                                isDose: true,
                                constent: "ซื้อและดาวน์โหลดไฟล์ภาพในรูปแบบดิจิทัล",
                            }
                        ]
                    }

                ]
            },
            {
                isDose: false,
                subHeading: "",
                contect: "1.3 บริการนี้ไม่อนุญาตให้ใช้เพื่อการละเมิดสิทธิส่วนบุคคล เช่น การค้นหาภาพบุคคลอื่นโดยไม่ได้รับอนุญาต",
                sub: []
            }]
        },
        {
            heading: "2. เงื่อนไขการซื้อขาย",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "2.1 ผู้ใช้งานสามารถซื้อภาพถ่ายผ่านระบบชำระเงินที่ปลอดภัยของเว็บไซต์ ซึ่งรองรับบัตรเครดิต/เดบิต และช่องทางชำระเงินอิเล็กทรอนิกส์อื่น ๆ",
                subHeading: "",
                sub: []
            },
            {
                contect: "2.2 เมื่อชำระเงินสำเร็จ ระบบจะให้สิทธิ์ผู้ใช้งานในการดาวน์โหลดไฟล์ภาพในรูปแบบดิจิทัลเท่านั้น",
                subHeading: "",
                isDose: false,
                sub: []
            },
            {
                contect: "2.3 การซื้อขายถือว่าเป็น <b>Final Sale</b> ไม่สามารถคืนเงินหรือแลกเปลี่ยนได้ ยกเว้นกรณี:",
                subHeading: "",
                isDose: false,
                sub: [
                    {
                        isDose: true,
                        subTitle: "ไฟล์ภาพเสียหาย ดาวน์โหลดไม่ได้",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "มีข้อผิดพลาดจากระบบของ checkfoto.com",
                        item: []
                    }
                ]
            },
            {
                contect: "2.4 เว็บไซต์ไม่รับผิดชอบต่อการใช้งานภาพถ่ายในทางที่ผิดกฎหมายหรือขัดต่อจริยธรรม",
                subHeading: "",
                isDose: false,
                sub: []
            },
            ]
        },
        {
            heading: "3. ความเป็นส่วนตัวและข้อมูลส่วนบุคคล (Privacy Policy)",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "3.1 การเก็บรวบรวมข้อมูล",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "checkfoto.com จะเก็บรวบรวมข้อมูลที่จำเป็นต่อการให้บริการ เช่น ชื่อ-นามสกุล, อีเมล, ข้อมูลการชำระเงิน และภาพใบหน้าที่ใช้ค้นหาภาพถ่าย",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "ข้อมูลจะถูกเก็บรักษาอย่างปลอดภัยและไม่ถูกเปิดเผยต่อบุคคลภายนอก เว้นแต่เป็นไปตามที่กฎหมายกำหนด",
                        item: []
                    }
                ]
            },
            {
                contect: "3.2 วัตถุประสงค์ในการใช้ข้อมูล",
                subHeading: "ข้อมูลของผู้ใช้งานจะถูกใช้เพื่อ:",
                isDose: false,
                sub: [
                    {
                        isDose: false,
                        subTitle: "",
                        item: [
                            {
                                isDose: false,
                                constent: "1. ค้นหาและยืนยันภาพถ่ายของผู้ใช้งาน",
                            },
                            {
                                isDose: false,
                                constent: "2. จัดส่งไฟล์ภาพหรือแจ้งเตือนการสั่งซื้อ",
                            },
                            {
                                isDose: false,
                                constent: "3. ปรับปรุงคุณภาพและความปลอดภัยของระบบ",
                            }
                        ]
                    }
                ]
            },
            {
                contect: "3.3 ความปลอดภัยของข้อมูล",
                subHeading: "",
                isDose: false,
                sub: [
                    {
                        isDose: true,
                        subTitle: "ระบบจัดเก็บข้อมูลของ checkfoto.com ใช้เทคโนโลยีเข้ารหัส (Encryption) และมาตรการรักษาความปลอดภัยตามมาตรฐานสากล",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "ผู้ใช้งานมีหน้าที่เก็บรักษาบัญชีผู้ใช้งานและรหัสผ่านของตนเองให้ปลอดภัย",
                        item: []
                    }
                ]
            },
            ]
        },
        {
            heading: "4. สิทธิของผู้ใช้งาน",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "ผู้ใช้งานมีสิทธิ์เข้าถึง แก้ไข หรือลบข้อมูลส่วนตัวของตนเองภายใต้ขอบเขตที่กฎหมายกำหนด",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "หากผู้ใช้งานต้องการลบบัญชีและข้อมูลทั้งหมด สามารถติดต่อฝ่ายบริการลูกค้าของ checkfoto.com ได้",
                        item: []
                    }
                ]
            }
            ]
        },
        {
            heading: "5. ลิขสิทธิ์และทรัพย์สินทางปัญญา",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "ภาพถ่ายทั้งหมดบนเว็บไซต์นี้เป็นทรัพย์สินของผู้ถ่ายภาพและ checkfoto.com",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "ห้ามคัดลอก ทำซ้ำ แจกจ่าย หรือใช้ภาพในเชิงพาณิชย์โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร",
                        item: []
                    }
                ]
            }]
        },
        {
            heading: "6. ความรับผิดชอบและข้อจำกัด",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "checkfoto.com จะไม่รับผิดชอบต่อความเสียหายใด ๆ ที่เกิดขึ้นจากการใช้งานเว็บไซต์ นอกเหนือจากกรณีที่เกิดจากความบกพร่องของระบบโดยตรง",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "ผู้ใช้งานต้องรับผิดชอบต่อการกระทำของตนเองเมื่อใช้ภาพถ่ายหรือข้อมูลจากเว็บไซต์",
                        item: []
                    }
                ]
            }]
        },
        {
            heading: "7. การแก้ไขข้อกำหนด",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "checkfoto.com ขอสงวนสิทธิ์ในการปรับปรุง เปลี่ยนแปลง หรือเพิ่มเติมข้อกำหนดและเงื่อนไขนี้ โดยไม่ต้องแจ้งให้ทราบล่วงหน้า",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "การเปลี่ยนแปลงมีผลทันทีเมื่อประกาศบนเว็บไซต์",
                        item: []
                    }
                ]
            }]
        },
        {
            heading: "8. ช่องทางติดต่อ",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "หากมีข้อสงสัยเกี่ยวกับการใช้งานเว็บไซต์ สามารถติดต่อได้ที่:",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "อีเมล: info@checkfoto.com",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "โทรศัพท์: 66 610104669",
                        item: []
                    }
                ]
            }]
        }
    ]
};

const termsEn = {
    title: "Terms of Use",
    effectiveDate: ["Welcome to <b>checkfoto.com</b>, a platform for purchasing event photos from sports competitions, concerts, and other entertainment activities using <b>Face Recognition technology.</b>", "By accessing and using this website, you agree to comply with and be bound by the following terms and conditions."],
    sections: [
        {
            heading: "1. Services Provided",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "1.1 <b>checkfoto.com</b> provides storage and sales of event photos, using <b>Face Recognition technology</b> to accurately and securely identify and deliver images relevant to each user.",
                subHeading: "",
                sub: []
            },
            {
                contect: "1.2 The platform is intended for:",
                subHeading: "",
                isDose: false,
                sub: [
                    {
                        isDose: true,
                        subTitle: "Searching for personal event photos",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "Purchasing and downloading digital image files",
                        item: []
                    }

                ]
            },
            {
                isDose: false,
                subHeading: "",
                contect: "1.3 Users are <b>prohibited</b> from using this service to search for or obtain images of other individuals without proper authorization.",
                sub: []
            }]
        },
        {
            heading: "2. Purchase and Sales Terms",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "2.1 Users may purchase photos through secure online payment methods, including credit/debit cards and other supported electronic payment channels.",
                subHeading: "",
                sub: []
            },
            {
                contect: " 2.2 Upon successful payment, users will be granted access to download their purchased photos in a digital format only.",
                subHeading: "",
                isDose: false,
                sub: []
            },
            {
                contect: "2.3 All sales are considered <b>final and non-refundable</b>, except in the following cases:",
                subHeading: "",
                isDose: false,
                sub: [
                    {
                        isDose: true,
                        subTitle: "The downloaded file is corrupted or inaccessible",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "Errors caused by the <b>checkfoto.com</b> system",
                        item: []
                    },
                ]
            },
            {
                contect: "2.4 <b>checkfoto.com</b> shall not be held liable for any misuse of images in violation of the law or ethical standards.",
                subHeading: "",
                isDose: false,
                sub: []
            },
            ]
        },
        {
            heading: "3. Privacy Policy",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "3.1 Data Collection",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "<b>checkfoto.com</b> collects only the necessary information to provide services, which may include name, email address, payment details, and facial data used to identify relevant event photos.",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "All collected data is kept strictly confidential and will not be disclosed to third parties unless required by law.",
                        item: []
                    }
                ]
            },
            {
                contect: "3.2 Purpose of Data Usage",
                subHeading: "Collected data will be used for:",
                isDose: false,
                sub: [
                    {
                        isDose: false,
                        subTitle: "",
                        item: [
                            {
                                isDose: false,
                                constent: "1. Identifying and retrieving users' photos",
                            },
                            {
                                isDose: false,
                                constent: "2. Delivering digital files and purchase confirmations",
                            },
                            {
                                isDose: false,
                                constent: "3. Enhancing service quality and maintaining system security",
                            }
                        ]
                    }
                ]
            },
            {
                contect: "3.3 Data Security",
                subHeading: "",
                isDose: false,
                sub: [
                    {
                        isDose: true,
                        subTitle: "<b>checkfoto.com</b> uses industry-standard encryption and security protocols to safeguard all personal and payment data.",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "Users are responsible for maintaining the confidentiality of their accounts and passwords",
                        item: []
                    }
                ]
            },
            ]
        },
        {
            heading: "4. User Rights",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "Users have the right to access, modify, or request deletion of their personal data in accordance with applicable laws.",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "To permanently delete an account and all related data, users may contact the <b>checkfoto.com</b> support team.",
                        item: []
                    }
                ]
            }
            ]
        },
        {
            heading: "5. Copyright and Intellectual Property",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "All photos available on this platform are the property of their respective photographers and <b>checkfoto.com</b>.",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "Unauthorized reproduction, distribution, or commercial use of images is strictly prohibited without prior written consent.",
                        item: []
                    }
                ]
            }]
        },
        {
            heading: "6. Liability and Limitations",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "<b>checkfoto.com</b> is not responsible for any damages arising from the use of this website, except in cases where issues are directly caused by the platform's systems.",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "Users are solely responsible for any actions taken using images or data obtained from this website.",
                        item: []
                    }
                ]
            }]
        },
        {
            heading: "7. Amendments to Terms",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "",
                subHeading: "",
                sub: [
                    {
                        isDose: true,
                        subTitle: "<b>checkfoto.com</b> reserves the right to modify, update, or amend these terms and conditions without prior notice.",
                        item: []
                    },
                    {
                        isDose: true,
                        subTitle: "Any changes will take effect immediately upon being posted on the website.",
                        item: []
                    }
                ]
            }]
        },
        {
            heading: "8. Contact Information",
            subHeading: "",
            content: [{
                isDose: false,
                contect: "For any inquiries or support, please contact us via:",
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
                    }
                ]
            }]
        }
    ]
};

export default function TermsOfUseContent() {

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
