import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const CATEGORY_SCOPES: Record<string, string[]> = {
    "Engineering": [
        "Site Analysis and Feasibility Studies",
        "Detailed Engineering Design and Drafting",
        "Procurement and Logistics Management",
        "Project Supervision and Quality Control",
        "Commissioning and Handover Services"
    ],
    "Consultancy": [
        "Information Security Assessment and Audit",
        "Business Process Workflow Optimization",
        "ICT Strategy and Lifecycle Management",
        "Regulatory Compliance and Certification Support",
        "Technological Impact and Performance Reviews"
    ],
    "Infrastructure": [
        "Groundbreaking and Site Preparation",
        "Structural Steel and Civil Works",
        "Facility Electrification and Wiring",
        "Smart Monitoring and Security Integration",
        "Post-Construction Maintenance and Support"
    ],
    "Technology": [
        "Full-Stack Bespoke Software Development",
        "Enterprise System Architecture Design",
        "Network Infrastructure and Monitoring",
        "Cloud Migration and Cybersecurity Audits",
        "End-User Training and Technical Support"
    ]
}

const DEFAULT_SCOPES = [
    "Requirement Gathering and Analysis",
    "Detailed Technical Documentation",
    "Implementation and Project Delivery",
    "Rigorous Quality Assurance Testing",
    "Operational Support and Maintenance"
]

async function enrichProjects() {
    console.log('--- Enriching Projects with Scopes ---')

    const { data: projects, error: fetchError } = await supabase
        .from('Project')
        .select('*')

    if (fetchError) {
        console.error('Error fetching projects:', fetchError)
        return
    }

    for (const project of projects) {
        let currentScope: string[] = []
        try {
            if (project.scope) {
                currentScope = typeof project.scope === 'string' ? JSON.parse(project.scope) : project.scope
            }
        } catch (e) {
            currentScope = []
        }

        // If less than 5 items, add more
        if (currentScope.length < 5) {
            const extraNeeded = 5 - currentScope.length
            const pool = CATEGORY_SCOPES[project.category] || DEFAULT_SCOPES

            // Avoid duplicates
            const newItems = pool.filter(item => !currentScope.includes(item)).slice(0, extraNeeded)
            const finalScope = [...currentScope, ...newItems]

            // If still less than 5 (rare), use default items
            if (finalScope.length < 5) {
                const defaultsPool = DEFAULT_SCOPES.filter(item => !finalScope.includes(item))
                finalScope.push(...defaultsPool.slice(0, 5 - finalScope.length))
            }

            const { error: updateError } = await supabase
                .from('Project')
                .update({ scope: JSON.stringify(finalScope) })
                .eq('id', project.id)

            if (updateError) {
                console.error(`Error updating project ${project.id}:`, updateError)
            } else {
                console.log(`Updated project: ${project.title}`)
            }
        }
    }

    console.log('✅ Project enrichment complete!')
}

enrichProjects()
