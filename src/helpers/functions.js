import { createClient } from "@supabase/supabase-js";
const supabaseUrl =
	"https://fnvkexlatwehayrrgfjl.supabase.co" ||
	process.env.REACT_APP_SUPABASE_URL;
const supabaseAnon =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZudmtleGxhdHdlaGF5cnJnZmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzOTgzNzksImV4cCI6MTk1OTk3NDM3OX0.N7Oxo5E4woSp-30QD5S_0jMQrABf7CS6af8W6tqlG8k" ||
	process.env.REACT_APP_SUPABASE_ANON;
const supabase = createClient(supabaseUrl, supabaseAnon);

export { supabase };
