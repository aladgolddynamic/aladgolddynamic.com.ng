// Using native fetch (Node 18+)

async function test() {
    const testEmail = `test-${Date.now()}@example.com`
    console.log(`🚀 Testing subscription for: ${testEmail}`)

    // 1. Subscribe
    const subRes = await fetch('http://localhost:3000/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail })
    })

    if (subRes.ok) {
        console.log('✅ Subscription successful')
    } else {
        console.error('❌ Subscription failed', await subRes.text())
        return
    }

    // 2. Check Admin API
    console.log('🔍 Checking Admin Newsletter API...')
    const adminRes = await fetch('http://localhost:3000/api/admin/newsletter')
    if (adminRes.ok) {
        const data = await adminRes.json()
        const found = data.find(s => s.email === testEmail)
        if (found) {
            console.log('✅ Email found in admin list')
        } else {
            console.error('❌ Email NOT found in admin list')
        }
    } else {
        console.error('❌ Admin API failed', await adminRes.text())
    }
}

test()
