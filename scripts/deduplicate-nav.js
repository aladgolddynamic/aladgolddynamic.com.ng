const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('🔍 Checking for duplicate navigation items...')

    const allItems = await prisma.navigationItem.findMany()
    const seen = new Set()
    const duplicates = []

    for (const item of allItems) {
        const key = `${item.label}-${item.type}-${item.href}`
        if (seen.has(key)) {
            duplicates.push(item.id)
        } else {
            seen.add(key)
        }
    }

    if (duplicates.length === 0) {
        console.log('✅ No duplicates found.')
        return
    }

    console.log(`🗑️ Found ${duplicates.length} duplicates. Deleting...`)

    await prisma.navigationItem.deleteMany({
        where: {
            id: {
                in: duplicates
            }
        }
    })

    console.log('✅ Deduplication complete.')
}

main()
    .catch((e) => {
        console.error('❌ Error during deduplication:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
