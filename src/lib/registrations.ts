import { supabase } from "@/integrations/supabase/client";

export type RegistrationStatus = "new" | "contacted" | "confirmed" | "active" | "waiting" | "cancelled";

export const registrationStatusLabels: Record<RegistrationStatus, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  confirmed: "مؤكد",
  active: "متمدرس",
  waiting: "قائمة الانتظار",
  cancelled: "ملغى",
};

export interface RegistrationInput {
  parent_name: string;
  phone: string;
  level: string;
  academic_year: string;
  first_name?: string;
  last_name?: string;
  birth_date?: string | null;
  age?: number | null;
}

/** Stores the parent's request; WhatsApp still opens even if saving fails. */
export async function saveRegistration(input: RegistrationInput) {
  if (!input.parent_name || !input.phone) return;
  const { error } = await supabase.from("registrations").insert(input);
  if (error) console.error("registration save failed", error.message);
}
