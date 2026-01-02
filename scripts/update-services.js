const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('--- Seeding Pira-Tech Services ---')

    const services = [
        // Consultancy Services
        {
            title: "Software Development",
            description: "We build applications using the latest web and mobile technologies to provide our clients with the best and suitable web and mobile software apps. With our team of full-stack software developers we can help you build software solutions that solve specific business objectives in one or more areas in your business.",
            icon: "Globe",
            color: "bg-purple-500",
            category: "consultancy",
            capabilities: JSON.stringify(["Web & Mobile Apps", "Full-stack development", "Business objective alignment"]),
            featured: true,
            order: 1
        },
        {
            title: "Information Security and Audit",
            description: "Auditing information security covers areas from auditing the physical security of data centers to auditing the logical security of databases. It is often then referred to as an information technology security audit or a computer security audit.",
            icon: "Lock",
            color: "bg-purple-500",
            category: "consultancy",
            capabilities: JSON.stringify(["Physical security audits", "Logical security audits", "Compliance verification"]),
            featured: true,
            order: 2
        },
        {
            title: "ICT Training",
            description: "We provide ICT- related training courses, including the training of web and mobile software developers, system builders, among others. We also provide training and preparatory audits for the ISO 9001, ISO 27001, ISO 2000, ISO 22301 and ISO 14001 certification.",
            icon: "GraduationCap",
            color: "bg-purple-500",
            category: "consultancy",
            capabilities: JSON.stringify(["Developer training", "System builder courses", "ISO certification prep"]),
            featured: false,
            order: 3
        },
        {
            title: "Business Process Automation",
            description: "As organizations work towards achieving digital transformation, they are concerned with changing their business work-flow from the orthodox process to a technology- enabled process. At Aladgold Dynamic, we are committed to ensuring that our clients achieve a smooth and seamless transition.",
            icon: "Settings2",
            color: "bg-purple-500",
            category: "consultancy",
            capabilities: JSON.stringify(["Workflow transformation", "Digital transformation", "Technology enablement"]),
            featured: false,
            order: 4
        },
        {
            title: "Consultancy Services",
            description: "Our ICT consultancy ensures that technology solutions not only meet the requirements of our clients, but that it is implemented and managed to realize the expected benefits. Aladgold Dynamic Nigeria Limited provides expert consultancy that covers the entire lifecycle of the design and implementation of our ICT solutions and systems.",
            icon: "FileText",
            color: "bg-purple-500",
            category: "consultancy",
            capabilities: JSON.stringify(["Design & implementation", "Lifecycle management", "Benefit realization"]),
            featured: true,
            order: 5
        },
        {
            title: "Cyber Security Training",
            description: "We believe cybersecurity starts with people, not firewalls. Our training programs equip teams with the knowledge and awareness needed to identify, prevent, and respond to threats effectively.",
            icon: "ShieldAlert",
            color: "bg-purple-500",
            category: "consultancy",
            capabilities: JSON.stringify(["Security awareness", "Threat identification", "Response training"]),
            featured: false,
            order: 6
        },

        // Engineering Services
        {
            title: "Quality Policy",
            description: "Pira-Tech Nigeria Limited and associated companies are committed to providing quality services to Clients. We will develop working relationship where everyone associated with us, pull together to achieve our commitment and we will continually improve the services we provide.",
            icon: "ShieldCheck",
            color: "bg-blue-500",
            category: "engineering",
            capabilities: JSON.stringify(["Service quality commitment", "Continuous improvement", "Client relationship focus"]),
            featured: false,
            order: 7
        },
        {
            title: "Enterprise Application Development",
            description: "We design and develop bespoke software applications tailored to your business. Support your organization with robust and scalable software that improves key facets of your business, from process automation to employee collaboration.",
            icon: "Cpu",
            color: "bg-blue-500",
            category: "engineering",
            capabilities: JSON.stringify(["Bespoke solutions", "Scalable architecture", "Process automation"]),
            featured: true,
            order: 8
        },
        {
            title: "MDA Process Automation",
            description: "We empower Ministries, Departments, and Agencies (MDAs) to embrace digital efficiency through process automation. By eliminating manual bottlenecks, our solutions help public institutions achieve transparency, accountability, and speed in service delivery.",
            icon: "Building2",
            color: "bg-blue-500",
            category: "engineering",
            capabilities: JSON.stringify(["MDA empowerment", "Manual process elimination", "Transparency & speed"]),
            featured: true,
            order: 9
        },
        {
            title: "Enterprise Business Suite",
            description: "Our Enterprise Business Suite (EBS) is a fully integrated platform that combines Finance, HR, Procurement, Project Management, and Asset Management in one unified solution—built for scalability and performance.",
            icon: "ShoppingCart",
            color: "bg-blue-500",
            category: "engineering",
            capabilities: JSON.stringify(["Integrated finance & HR", "Integrated procurement", "Project & asset management"]),
            featured: false,
            order: 10
        },
        {
            title: "Network Management",
            description: "Expert network monitoring, optimization and management to ensure your business stays connected and efficient.",
            icon: "Wifi",
            color: "bg-blue-500",
            category: "engineering",
            capabilities: JSON.stringify(["Network monitoring", "LAN/WAN/Fiber", "Business connectivity"]),
            featured: false,
            order: 11
        },
        {
            title: "Software Integration Services",
            description: "Seamlessly connecting your various software systems to create a unified and efficient workflow.",
            icon: "RefreshCw",
            color: "bg-blue-500",
            category: "engineering",
            capabilities: JSON.stringify(["System connectivity", "Workflow unification", "Efficient data flow"]),
            featured: false,
            order: 12
        },
        {
            title: "Data Management",
            description: "Handling your data with precision and care, ensuring it is secure, accessible and well-organized.",
            icon: "Server",
            color: "bg-blue-500",
            category: "engineering",
            capabilities: JSON.stringify(["Data security", "Organized data", "Accessible storage"]),
            featured: false,
            order: 13
        },
        {
            title: "CCTV, Access Control, and Surveillance",
            description: "Comprehensive security solutions protecting your assets with smart surveillance and access control systems.",
            icon: "Cctv",
            color: "bg-blue-500",
            category: "engineering",
            capabilities: JSON.stringify(["Smart surveillance", "Access control", "Asset protection"]),
            featured: false,
            order: 14
        }
    ]

    // Clear existing services
    await prisma.service.deleteMany()

    for (const service of services) {
        await prisma.service.create({
            data: service
        })
    }

    console.log('✅ Seeding complete!')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
