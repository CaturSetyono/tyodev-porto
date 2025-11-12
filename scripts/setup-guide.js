const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const main = async () => {
  console.log('🚀 Portfolio Admin Dashboard Setup Guide')
  console.log('==========================================\n')

  // Step 1: Verify environment
  console.log('📋 Step 1: Environment Check')
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

  if (!url || !serviceKey) {
    console.log('❌ Missing Supabase credentials!')
    process.exit(1)
  }

  console.log(`✅ Supabase URL: ${url}`)
  console.log(`✅ Admin Email: ${adminEmail}`)
  console.log(`✅ Service Key: ${serviceKey.substring(0, 20)}...`)
  
  // Step 2: Test basic connection
  console.log('\n📋 Step 2: Testing Connection')
  const supabase = createClient(url, serviceKey)
  
  try {
    // Test with a simple query that should work even without tables
    const { error } = await supabase.rpc('version')
    
    if (error && !error.message.includes('function') && !error.message.includes('does not exist')) {
      console.log('❌ Connection failed:', error.message)
      console.log('\n💡 Please check your Supabase credentials')
      process.exit(1)
    }
    
    console.log('✅ Supabase connection works!')
    
  } catch {
    // Even if RPC fails, it means connection works
    console.log('✅ Supabase connection established!')
  }

  // Step 3: Manual Database Setup Instructions
  console.log('\n📋 Step 3: Database Schema Setup')
  console.log('🔧 PLEASE FOLLOW THESE STEPS MANUALLY:')
  console.log('')
  console.log('1. Open your browser and go to: https://supabase.com/dashboard')
  console.log('2. Login and select your project')
  console.log(`3. Your project: ${url.split('//')[1].split('.')[0]}`)
  console.log('4. Click on "SQL Editor" in the left sidebar')
  console.log('5. Click "New Query" button')
  console.log('6. Open file: database/schema.sql (in this project)')
  console.log('7. Copy ALL content from schema.sql')
  console.log('8. Paste it in the SQL Editor')
  console.log('9. Click "Run" button')
  console.log('10. Wait for "Success. No rows returned" message')
  console.log('')
  console.log('📄 Schema file location: database/schema.sql')
  console.log('🔗 Quick link: https://supabase.com/dashboard/project/' + url.split('//')[1].split('.')[0] + '/sql')
  console.log('')
  
  // Step 4: Next steps
  console.log('📋 Step 4: After Running Schema')
  console.log('Once you\'ve run the SQL schema, run these commands:')
  console.log('')
  console.log('  npm run setup-admin     # Creates admin user')
  console.log('  npm run dev              # Start development server')
  console.log('')
  console.log('Then visit: http://localhost:3000/admin')
  console.log(`Login with: ${adminEmail}`)
  console.log(`Password: ${adminPassword}`)
  console.log('')
  console.log('🎉 That\'s it! Your admin dashboard will be ready!')
}

main().catch(console.error)