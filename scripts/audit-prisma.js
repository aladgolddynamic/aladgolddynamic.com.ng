const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('--- Prisma Client Audit ---')
    console.log('Available models:', Object.keys(prisma).filter(k => k[0] !== '_' && typeof prisma[k] === 'object'))

    if (prisma.newsletter) {
        console.log('✅ newsletter model found')
        const count = await prisma.newsletter.count()
        console.log(`Current newsletter count: ${count}`)
    } else {
        console.error('❌ newsletter model NOT found in client')
    }
}

main()
    .catch(e => console.error('Error during audit:', e))
    .finally(() => prisma.$disconnect())
