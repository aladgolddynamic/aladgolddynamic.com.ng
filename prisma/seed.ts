import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create default admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@aladgold.com' },
        update: {},
        create: {
            email: 'admin@aladgold.com',
            password: hashedPassword,
            name: 'Admin User',
            role: 'SUPER_ADMIN',
        },
    })
    console.log('✅ Created admin user:', admin.email)

    // Create company profile
    const companyProfile = await prisma.companyProfile.upsert({
        where: { id: 'default' },
        update: {},
        create: {
            id: 'default',
            name: 'Aladgold Dynamic Company Limited',
            heroTitle: 'Building the Infrastructure and Digital Intelligence That Power Sustainable Progress',
            heroSubtitle: 'Leading Nigerian engineering and construction firm delivering excellence across all sectors',
            aboutContent: 'A trusted partner in achieving business growth and sustainable development across all sectors.',
            footerExcerpt: 'Leading engineering and construction firm in Nigeria, specialized in sustainable infrastructure.',
            mission: 'To deliver world-class engineering, construction, and infrastructure solutions that drive sustainable development and exceed client expectations through innovation, quality, and integrity.',
            vision: 'To be the leading engineering and construction firm in Nigeria, recognized for excellence, innovation, and our contribution to national infrastructure development.',
            values: 'Excellence, integrity, innovation, safety, and sustainability guide every project we undertake, ensuring lasting value for our clients and communities.',
            address: 'No. 69 Abidja Street, Wuse Zone 3, Abuja',
            phone: '08072653178',
            phone2: '09013069506',
            email: 'aladgolddynamic@gmail.com',
            facebook: 'https://web.facebook.com/profile.php?id=61585197586795',
            twitter: 'https://x.com/aladgolddynamic',
            instagram: 'https://www.instagram.com/aladgold_dynamic/',
            linkedin: '#',
        },
    })
    console.log('✅ Created company profile')

    // Create navigation items
    const navigationItems = [
        { label: 'Home', href: '/', order: 1, type: 'header', visible: true },
        { label: 'Services', href: '/services', order: 2, type: 'header', visible: true },
        { label: 'Projects', href: '/projects', order: 3, type: 'header', visible: true },
        { label: 'News', href: '/news', order: 4, type: 'header', visible: true },
        { label: 'About', href: '/about', order: 5, type: 'header', visible: true },
        { label: 'Contact', href: '/contact', order: 6, type: 'header', visible: true },
        // Footer links
        { label: 'Our Story', href: '/about', order: 1, type: 'footer', visible: true },
        { label: 'Careers', href: '/careers', order: 2, type: 'footer', visible: true },
        { label: 'Latest News', href: '/news', order: 3, type: 'footer', visible: true },
        { label: 'Get in Touch', href: '/contact', order: 4, type: 'footer', visible: true },
    ]

    for (const item of navigationItems) {
        await prisma.navigationItem.upsert({
            where: {
                label_type: {
                    label: item.label,
                    type: item.type,
                }
            },
            update: item,
            create: item,
        })
    }
    console.log('✅ Created navigation items')

    // Create services
    const services = [
        {
            title: 'Engineering & Construction',
            description: 'Civil & building construction, road construction & maintenance, drainage, culverts & erosion control, structural works, dredging, land reclamation & canalization',
            icon: 'Building2',
            color: 'bg-blue-500',
            capabilities: JSON.stringify([
                'Full-scale building construction (residential, commercial, industrial)',
                'Road construction and rehabilitation projects',
                'Drainage systems and flood control infrastructure',
                'Erosion control and land stabilization',
                'Culvert construction and bridge works',
                'Dredging operations and waterway maintenance',
                'Land reclamation and site preparation',
            ]),
            featured: true,
            order: 1,
        },
        {
            title: 'Electrical Engineering & Systems',
            description: 'Power installations, UPS & special power supplies, SCADA & control systems, lighting & standby power, data networks & access control',
            icon: 'Zap',
            color: 'bg-amber-500',
            capabilities: JSON.stringify([
                'Complete power distribution system installations',
                'UPS and standby power solutions',
                'SCADA systems for industrial control',
                'Building automation and control systems',
                'Street and security lighting installations',
                'Data center and network infrastructure',
                'Access control and security systems',
            ]),
            featured: true,
            order: 2,
        },
        {
            title: 'Solar Energy & Renewable Solutions',
            description: 'Solar power systems, solar street lighting, centralized solar power farms, off-grid & rural electrification, energy consultancy',
            icon: 'Sun',
            color: 'bg-orange-500',
            capabilities: JSON.stringify([
                'Residential and commercial solar installations',
                'Solar street lighting for communities and highways',
                'Large-scale solar farms for industrial use',
                'Off-grid solar solutions for remote areas',
                'Hybrid solar systems with battery backup',
                'Solar water pumping systems',
                'Energy audits and optimization consultancy',
            ]),
            featured: true,
            order: 3,
        },
        {
            title: 'Water Resources & Borehole Services',
            description: 'Industrial & domestic boreholes, solar-powered boreholes, irrigation systems, water tanks & reservoirs, geophysical & hydraulic studies',
            icon: 'Droplets',
            color: 'bg-cyan-500',
            capabilities: JSON.stringify([
                'Geophysical surveys and site investigation',
                'Borehole drilling (domestic and industrial scale)',
                'Solar-powered water supply systems',
                'Water treatment and purification plants',
                'Irrigation system design and installation',
                'Water storage tanks and elevated reservoirs',
                'Hydraulic studies and groundwater assessments',
            ]),
            featured: true,
            order: 4,
        },
        {
            title: 'Consultancy & Project Services',
            description: 'Technical consultancy, project monitoring & evaluation, feasibility studies, environmental services, design & planning',
            icon: 'FileText',
            color: 'bg-purple-500',
            capabilities: JSON.stringify([
                'Detailed engineering design and planning',
                'Feasibility studies and project appraisal',
                'Environmental impact assessments',
                'Project management and supervision',
                'Quality assurance and compliance monitoring',
                'Technical training and capacity building',
                'Due diligence and technical audits',
            ]),
            featured: false,
            order: 5,
        },
        {
            title: 'Procurement & General Contracts',
            description: 'Government & NGO procurement, technical & general supplies, contract execution & logistics',
            icon: 'ShoppingCart',
            color: 'bg-green-500',
            capabilities: JSON.stringify([
                'Government tender and contract execution',
                'Technical equipment sourcing and supply',
                'General supplies for agencies and NGOs',
                'Logistics and delivery management',
                'Vendor management and quality control',
                'Import and customs clearance services',
                'Maintenance and after-sales support',
            ]),
            featured: false,
            order: 6,
        },
        {
            title: 'IT Consultancy & Support',
            description: 'Technology solutions, system integration, technical support, digital transformation, software development, IT infrastructure management',
            icon: 'Monitor',
            color: 'bg-indigo-500',
            capabilities: JSON.stringify([
                'Custom software development and integration',
                'IT infrastructure design and implementation',
                'System integration and migration services',
                '24/7 technical support and maintenance',
                'Digital transformation consulting',
                'Network setup and management',
                'IT security assessments and solutions',
            ]),
            featured: false,
            order: 7,
        },
        {
            title: 'Cloud Computing & Data Protection',
            description: 'Cloud infrastructure, data security, backup solutions, cybersecurity services, cloud migration, data recovery',
            icon: 'Cloud',
            color: 'bg-sky-500',
            capabilities: JSON.stringify([
                'Cloud infrastructure setup and management',
                'Data encryption and security protocols',
                'Automated backup and disaster recovery',
                'Cybersecurity threat detection and response',
                'Cloud migration and optimization',
                'Data compliance and governance',
                'Secure cloud storage solutions',
            ]),
            featured: false,
            order: 8,
        },
    ]

    for (const service of services) {
        await prisma.service.create({ data: service })
    }
    console.log('✅ Created services')

    // Create sample projects
    const projects = [
        {
            title: 'Federal Ministry Road Infrastructure Project',
            category: 'construction',
            client: 'Government',
            location: 'Abuja, FCT',
            status: 'COMPLETED' as const,
            description: 'Complete road construction and drainage system for federal ministry complex',
            image: '/road-construction-nigeria.jpg',
        },
        {
            title: 'Solar-Powered Borehole Installation',
            category: 'water',
            client: 'NGO',
            location: 'Kaduna State',
            status: 'COMPLETED' as const,
            description: 'Installation of 5 solar-powered boreholes for rural communities',
            image: '/solar-borehole-water.jpg',
        },
        {
            title: 'State Government Electrical Systems Upgrade',
            category: 'electrical',
            client: 'Government',
            location: 'Lagos State',
            status: 'ONGOING' as const,
            description: 'Complete electrical system upgrade for state government facility',
            image: '/electrical-power-installation.jpg',
        },
    ]

    for (const project of projects) {
        await prisma.project.create({ data: project })
    }
    console.log('✅ Created sample projects')

    // Create site settings
    await prisma.siteSettings.upsert({
        where: { id: 'default' },
        update: {},
        create: {
            id: 'default',
            siteName: 'Aladgold Dynamic Company Limited',
            siteDescription: 'Leading Nigerian engineering and construction firm delivering excellence across all sectors',
            metaKeywords: 'engineering Nigeria, construction, solar energy, water resources, infrastructure',
            enableNewsSection: true,
            enableCareersSection: true,
            spontaneousApplications: true,
        },
    })
    console.log('✅ Created site settings')

    console.log('🎉 Seeding completed!')
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
