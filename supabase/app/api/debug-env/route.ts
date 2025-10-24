// app/api/debug-env/route.ts
export async function GET() {
  return new Response(
    JSON.stringify({
      hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      hasAnon: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      hasService: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}