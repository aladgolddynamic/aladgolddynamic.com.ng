
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

async function createBucket() {
    if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase URL or Key missing in .env.local')
        return
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Checking for "images" bucket...')

    const { data: buckets, error: listError } = await supabase.storage.listBuckets()

    if (listError) {
        console.error('Error listing buckets:', listError.message)
        return
    }

    const exists = buckets.find(b => b.name === 'images')

    if (exists) {
        console.log('Bucket "images" already exists.')
    } else {
        console.log('Creating "images" bucket...')
        const { data, error } = await supabase.storage.createBucket('images', {
            public: true,
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'],
            fileSizeLimit: 5242880 // 5MB
        })

        if (error) {
            console.error('Error creating bucket:', error.message)
            console.log('Note: You might need to create the bucket manually in the Supabase Dashboard if your anon key lacks permissions.')
        } else {
            console.log('Bucket "images" created successfully.')
        }
    }
}

createBucket()
