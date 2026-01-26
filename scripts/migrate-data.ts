import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function migrate() {
    console.log('Starting migration...')

    // 1. Migrate CompanyProfile
    const profiles = await prisma.companyProfile.findMany()
    for (const profile of profiles) {
        const { id, ...data } = profile
        const { error } = await supabase.from('CompanyProfile').upsert({ id, ...data })
        if (error) console.error('Error migrating CompanyProfile:', error)
    }
    console.log('Migrated CompanyProfile')

    // 2. Migrate Service
    const services = await prisma.service.findMany()
    for (const service of services) {
        const { id, ...data } = service
        const { error } = await supabase.from('Service').upsert({ id, ...data })
        if (error) console.error('Error migrating Service:', error)
    }
    console.log('Migrated Services')

    // 3. Migrate Project
    const projects = await prisma.project.findMany()
    for (const project of projects) {
        const { id, ...data } = project
        const { error } = await supabase.from('Project').upsert({ id, ...data })
        if (error) console.error('Error migrating Project:', error)
    }
    console.log('Migrated Projects')

    // 4. Migrate NewsPost
    const news = await prisma.newsPost.findMany()
    for (const post of news) {
        const { id, ...data } = post
        const { error } = await supabase.from('NewsPost').upsert({ id, ...data })
        if (error) console.error('Error migrating NewsPost:', error)
    }
    console.log('Migrated NewsPosts')

    // 5. Migrate TeamMember
    const team = await prisma.teamMember.findMany()
    for (const member of team) {
        const { id, ...data } = member
        const { error } = await supabase.from('TeamMember').upsert({ id, ...data })
        if (error) console.error('Error migrating TeamMember:', error)
    }
    console.log('Migrated TeamMembers')

    // 6. Migrate Job
    const jobs = await prisma.job.findMany()
    for (const job of jobs) {
        const { id, ...data } = job
        const { error } = await supabase.from('Job').upsert({ id, ...data })
        if (error) console.error('Error migrating Job:', error)
    }
    console.log('Migrated Jobs')

    // 7. Migrate ContactSubmission
    const submissions = await prisma.contactSubmission.findMany()
    for (const sub of submissions) {
        const { id, ...data } = sub
        const { error } = await supabase.from('ContactSubmission').upsert({ id, ...data })
        if (error) console.error('Error migrating ContactSubmission:', error)
    }
    console.log('Migrated ContactSubmissions')

    // 8. Migrate NavigationItem
    const navItems = await prisma.navigationItem.findMany()
    for (const item of navItems) {
        const { id, ...data } = item
        const { error } = await supabase.from('NavigationItem').upsert({ id, ...data })
        if (error) console.error('Error migrating NavigationItem:', error)
    }
    console.log('Migrated NavigationItems')

    // 9. Migrate SiteSettings
    const settings = await prisma.siteSettings.findMany()
    for (const setting of settings) {
        const { id, ...data } = setting
        const { error } = await supabase.from('SiteSettings').upsert({ id, ...data })
        if (error) console.error('Error migrating SiteSettings:', error)
    }
    console.log('Migrated SiteSettings')

    // 10. Migrate Newsletter
    const newsletters = await prisma.newsletter.findMany()
    for (const nl of newsletters) {
        const { id, ...data } = nl
        const { error } = await supabase.from('Newsletter').upsert({ id, ...data })
        if (error) console.error('Error migrating Newsletter:', error)
    }
    console.log('Migrated Newsletter')

    // 11. Migrate User
    const users = await prisma.user.findMany()
    for (const user of users) {
        const { id, ...data } = user
        const { error } = await supabase.from('User').upsert({ id, ...data })
        if (error) console.error('Error migrating User:', error)
    }
    console.log('Migrated Users')

    console.log('Migration complete!')
}

migrate()
    .catch((e) => {
        console.error('Migration failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
