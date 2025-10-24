import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseServer";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.string().email(),
  message: z.string().min(1),
  acceptTerms: z.boolean().refine(Boolean, "Debes aceptar los términos"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const sb = supabaseAdmin();
    const { error } = await sb.from("contact_messages").insert([
      {
        first_name: data.firstName,
        last_name: data.lastName ?? null,
        email: data.email,
        message: data.message,
        consent: data.acceptTerms,
      },
    ]);

    if (error) {
      console.error(error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Bad Request" },
      { status: 400 }
    );
  }
}
