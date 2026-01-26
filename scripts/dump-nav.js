const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('--- DB DUMP ---')
    const items = await prisma.navigationItem.findMany()
    console.log(JSON.stringify(items, null, 2))

    console.log('--- ANALYSIS ---')
    const counts = {}
    items.forEach(item => {
        const key = `${item.label}|${item.type}`
        counts[key] = (counts[key] || 0) + 1
    })

    Object.entries(counts).forEach(([key, count]) => {
        if (count > 1) {
            console.log(`Duplicate: ${key} (${count} times)`)
        }
    })
}

main().finally(() => prisma.$disconnect())
