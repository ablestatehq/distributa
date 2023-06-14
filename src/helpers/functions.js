import { createClient } from "@supabase/supabase-js";
const supabaseUrl =
	"https://fnvkexlatwehayrrgfjl.supabase.co" ||
	process.env.REACT_APP_SUPABASE_URL;
const supabaseAnon =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZudmtleGxhdHdlaGF5cnJnZmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzOTgzNzksImV4cCI6MTk1OTk3NDM3OX0.N7Oxo5E4woSp-30QD5S_0jMQrABf7CS6af8W6tqlG8k" ||
	process.env.REACT_APP_SUPABASE_ANON;
const supabase = createClient(supabaseUrl, supabaseAnon);

export { supabase };

export function uniqueDateStringId() {
	const date = new Date();

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	const dateString = `${year}${month}${day}${hours}${minutes}${seconds}`;

	return dateString;
}
