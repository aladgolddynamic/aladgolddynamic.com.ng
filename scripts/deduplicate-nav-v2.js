const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('🔍 Comprehensive Navigation Audit...')
    const items = await prisma.navigationItem.findMany()
    const seen = new Map()
    const toDelete = []

    for (const item of items) {
        // Normalize: trim and lowercase
        const label = (item.label || "").trim().toLowerCase()
        const type = (item.type || "").trim().toLowerCase()
        const key = `${label}-${type}`

        if (seen.has(key)) {
            console.log(`❌ Duplicate found: "${item.label}" [${item.id}] matching earlier [${seen.get(key)}]`)
            toDelete.push(item.id)
        } else {
            seen.set(key, item.id)
        }
    }

    if (toDelete.length > 0) {
        console.log(`🗑️ Deleting ${toDelete.length} duplicates...`)
        const result = await prisma.navigationItem.deleteMany({
            where: { id: { in: toDelete } }
        })
        console.log(`✅ Deduplication successful. Deleted ${result.count} items.`)
    } else {
        console.log('✅ No duplicates found during audit.')
    }
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect())
