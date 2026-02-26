
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { join } from 'path'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

async function testStorage() {
    if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase URL or Key missing in .env.local')
        return
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Testing Supabase connection...')

    // Test database connection first
    const { data: dbData, error: dbError } = await supabase.from('Service').select('id').limit(1)
    if (dbError) {
        console.error('Database connection failed:', dbError.message)
    } else {
        console.log('Database connection successful.')
    }

    // Test storage buckets
    const { data: buckets, error: storageError } = await supabase.storage.listBuckets()
    if (storageError) {
        console.error('Storage access failed:', storageError.message)
    } else {
        console.log('Storage Buckets found:', buckets.length)
        buckets.forEach(b => console.log(`- ${b.name} (${b.public ? 'public' : 'private'})`))
    }
}

testStorage()
