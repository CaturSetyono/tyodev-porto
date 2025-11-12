const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

const checkAdminUser = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  console.log("🔍 Checking admin user in database...");
  console.log(`📧 Looking for email: ${adminEmail}`);

  try {
    // Query admin user
    const { data: adminUser, error } = await supabaseAdmin
      .from("admin_users")
      .select("*")
      .eq("email", adminEmail)
      .single();

    if (error) {
      console.log("❌ Error querying admin user:", error.message);

      if (error.message.includes("does not exist")) {
        console.log("\n💡 The admin_users table doesn't exist.");
        console.log("Please run the database schema first.");
      } else if (error.message.includes("No rows")) {
        console.log("\n💡 Admin user not found in database.");
        console.log("Try running: npm run setup:admin");
      }

      return;
    }

    console.log("✅ Admin user found!");
    console.log("📋 User details:");
    console.log(`  - ID: ${adminUser.id}`);
    console.log(`  - Email: ${adminUser.email}`);
    console.log(`  - Name: ${adminUser.full_name}`);
    console.log(`  - Role: ${adminUser.role}`);
    console.log(`  - Active: ${adminUser.is_active}`);
    console.log(`  - Has Password Hash: ${!!adminUser.password_hash}`);

    // Test password verification
    if (adminUser.password_hash && adminPassword) {
      console.log("\n🔐 Testing password verification...");
      const isValid = await bcrypt.compare(
        adminPassword,
        adminUser.password_hash
      );

      if (isValid) {
        console.log("✅ Password verification successful!");
        console.log("\n🎉 Login should work with these credentials:");
        console.log(`  Email: ${adminEmail}`);
        console.log(`  Password: ${adminPassword}`);
      } else {
        console.log("❌ Password verification failed!");
        console.log("💡 Try recreating the admin user:");
        console.log("  npm run setup:admin");
      }
    }
  } catch (err) {
    console.log("❌ Unexpected error:", err.message);
  }
};

checkAdminUser();
