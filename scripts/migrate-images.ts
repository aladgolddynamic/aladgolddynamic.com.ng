
import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { join } from 'path'
import { readFile, readdir } from 'fs/promises'

dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads')
const BUCKET_NAME = 'images'

async function migrateImages() {
    console.log('Starting image migration...')

    // 1. Get all local files
    let files: string[] = []
    try {
        files = await readdir(UPLOAD_DIR)
    } catch (e) {
        console.log('No local uploads directory found or error reading it.')
        return
    }

    if (files.length === 0) {
        console.log('No local images to migrate.')
        return
    }

    console.log(`Found ${files.length} images to migrate.`)

    const urlMap: Record<string, string> = {}

    // 2. Upload files to Supabase
    for (const fileName of files) {
        const filePath = join(UPLOAD_DIR, fileName)
        const fileBuffer = await readFile(filePath)

        console.log(`Uploading ${fileName}...`)
        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(fileName, fileBuffer, {
                upsert: true
            })

        if (error) {
            console.error(`Failed to upload ${fileName}:`, error.message)
            continue
        }

        const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(fileName)

        urlMap[`/uploads/${fileName}`] = publicUrl
        console.log(`Uploaded ${fileName} -> ${publicUrl}`)
    }

    // 3. Update database records
    console.log('Updating database records...')

    // Tables to check for image URLs
    const models = [
        { name: 'companyProfile', fields: ['logo', 'heroImage'] },
        { name: 'project', fields: ['image'] },
        { name: 'newsPost', fields: ['image'] },
        { name: 'teamMember', fields: ['image'] }
    ]

    for (const model of models) {
        const records = await (prisma as any)[model.name].findMany()
        for (const record of records) {
            let needsUpdate = false
            const updateData: any = {}

            for (const field of model.fields) {
                const currentUrl = record[field]
                if (currentUrl && urlMap[currentUrl]) {
                    updateData[field] = urlMap[currentUrl]
                    needsUpdate = true
                }
            }

            if (needsUpdate) {
                await (prisma as any)[model.name].update({
                    where: { id: record.id },
                    data: updateData
                })
                console.log(`Updated ${model.name} record ${record.id}`)
            }
        }
    }

    console.log('Migration complete!')
}

migrateImages()
    .catch((e) => {
        console.error('Migration failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
