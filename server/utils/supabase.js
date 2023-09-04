// import * as pg from "pg";
// import dotenv from "dotenv";

// const { Pool } = pg.default;
// dotenv.config();

// const pool = new Pool({
//   connectionString: `postgresql://postgres:[YOUR-PASSWORD]@db.tqjclbmprqjrgdrvylqd.supabase.co:5432/postgres`,
// });

// export { pool };

import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_ANON_KEY
dotenv.config();

export const supabase = createClient(supabaseUrl, supabaseKey)
