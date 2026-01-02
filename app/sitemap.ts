import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://aladgolddynamic.com' // Replace with actual production URL if known

    const supabase = await createClient()

    // Fetch dynamic routes
    const { data: services } = await supabase.from('Service').select('id')
    const { data: news } = await supabase.from('News').select('slug')
    const { data: jobs } = await supabase.from('Job').select('id')

    const serviceUrls = (services || []).map((s) => ({
        url: `${baseUrl}/services`, // Services are usually filtered on one page, but if there's detail: `${baseUrl}/services/${s.id}`
        lastModified: new Date(),
    }))

    const newsUrls = (news || []).map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
    }))

    const jobUrls = (jobs || []).map((job) => ({
        url: `${baseUrl}/careers/${job.id}`,
        lastModified: new Date(),
    }))

    const staticUrls = [
        '',
        '/about',
        '/services',
        '/projects',
        '/team',
        '/careers',
        '/news',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }))

    return [...staticUrls, ...newsUrls, ...jobUrls]
}
