// import * as pg from "pg";
// import dotenv from "dotenv";

// const { Pool } = pg.default;
// dotenv.config();

// const pool = new Pool({
//   connectionString: `postgresql://postgres:${process.env.PASSWORD}@db.tqjclbmprqjrgdrvylqd.supabase.co:5432/postgres`,
// });

// export { pool };

import { createClient } from "@supabase/supabase-js"
// import dotenv from "dotenv";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
// const supabaseKey = process.env.REACT_APP_ANON_KEY
// dotenv.config();

const supabase = createClient("https://tqjclbmprqjrgdrvylqd.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxamNsYm1wcnFqcmdkcnZ5bHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM3OTc1MzAsImV4cCI6MjAwOTM3MzUzMH0.gMM166HftNp44n89USUwnyUG7D7CFjfczMJu4PdgdW8")

export default supabase;