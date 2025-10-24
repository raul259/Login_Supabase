"use client";

import { useState } from "react";
 // 👈 Importa el cliente
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createClient } from "@supabase/supabase-js";
import{v4 as uuidv4} from "uuid";
import { uuid } from "zod";

const supabase = createClient("https://eoedgkhyapwlvrppnvjc.supabase.co","sb_publishable_APf4RDqJdBBNEJ77IJ81Gg_VcxgYtCV")
export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // 👇 Función que envía el email a Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("registered_emails")
      .insert({ email });

    if (error) {
      setMessage("❌ Ese email ya está registrado o hubo un error.");
      return;
    }

    setMessage("✅ Registro exitoso. ¡Email guardado correctamente!");
    setEmail(""); // Limpia el input
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a>
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
            <FieldDescription>
              Don&apos;t have an account? <a href="#">Sign up</a>
            </FieldDescription>
          </div>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // 👈 Captura el dato
            />
          </Field>

          <Field>
            <Button type="submit">Login</Button>
          </Field>

          {message && (
            <p className="text-center text-sm mt-2">
              {message}
            </p>
          )}

          <FieldSeparator>Or</FieldSeparator>

          {/* Tu resto del contenido se mantiene igual */}
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
