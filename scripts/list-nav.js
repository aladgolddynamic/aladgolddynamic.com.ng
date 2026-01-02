const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const items = await prisma.navigationItem.findMany({
        orderBy: { order: 'asc' }
    })
    console.log('--- Current Navigation Items ---')
    items.forEach(item => {
        console.log(`[${item.id}] Type: "${item.type}" | Label: "${item.label}" | Href: "${item.href}" | Order: ${item.order}`)
    })
    console.log('-------------------------------')
}

main().finally(() => prisma.$disconnect())
