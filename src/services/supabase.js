import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://crjqaulfzkzwbpnmhxeq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyanFhdWxmemt6d2Jwbm1oeGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODQyNDEsImV4cCI6MjA0MDI2MDI0MX0.140vQbbdhiq5tdLEIc6s3H9q2lqvAyhppuLun0S9ufI";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
