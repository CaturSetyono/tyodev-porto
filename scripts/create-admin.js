const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

const setupAdmin = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword =
    process.env.ADMIN_PASSWORD ||
    (() => {
      throw new Error("ADMIN_PASSWORD must be set in environment variables");
    })();

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  console.log("👤 Setting up admin user...");
  console.log(`📧 Email: ${adminEmail}`);
  console.log(`🔑 Password: ${adminPassword}`);

  try {
    // Check if admin already exists
    const { data: existingAdmin, error: checkError } = await supabaseAdmin
      .from("admin_users")
      .select("id, email")
      .eq("email", adminEmail)
      .maybeSingle();

    if (checkError && !checkError.message.includes("does not exist")) {
      throw checkError;
    }

    if (existingAdmin) {
      console.log("⚠️  Admin user already exists");
      console.log("✅ You can login to admin dashboard now!");
      return;
    }

    // Hash password
    console.log("🔐 Hashing password...");
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    console.log("👤 Creating admin user...");
    const { error } = await supabaseAdmin.from("admin_users").insert([
      {
        email: adminEmail,
        password_hash: passwordHash,
        full_name: "Administrator",
        role: "admin",
        is_active: true,
      },
    ]);

    if (error) {
      console.error("❌ Error creating admin user:", error.message);

      if (error.message.includes("does not exist")) {
        console.log("\n💡 The admin_users table doesn't exist yet.");
        console.log("Please run the database schema first:");
        console.log("1. npm run setup:guide");
        console.log("2. Follow the SQL setup instructions");
        console.log("3. Then run this command again");
      }

      return;
    }

    console.log("✅ Admin user created successfully!");
    console.log("");
    console.log("🔗 Next steps:");
    console.log("1. Start dev server: npm run dev");
    console.log("2. Visit: http://localhost:3000/admin");
    console.log(`3. Login with: ${adminEmail}`);
    console.log(`4. Password: ${adminPassword}`);
    console.log("");
    console.log("⚠️  Please change the password after first login!");
  } catch (error) {
    console.error("❌ Setup failed:", error.message);

    if (error.message.includes("does not exist")) {
      console.log("\n💡 Database tables not found.");
      console.log("Please run: npm run setup:guide");
      console.log("And follow the database setup instructions.");
    }
  }
};

setupAdmin();
