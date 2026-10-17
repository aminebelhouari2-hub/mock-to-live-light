import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Announcement { id: string; title: string; body: string }

/** Published school announcements managed from the admin dashboard. */
export function SchoolAnnouncements() {
  const [items, setItems] = useState<Announcement[]>([]);
  useEffect(() => {
    let active = true;
    supabase.from("announcements").select("id, title, body").eq("published", true)
      .order("created_at", { ascending: false }).limit(3)
      .then(({ data }) => { if (active && data) setItems(data); });
    return () => { active = false; };
  }, []);
  if (!items.length) return null;
  return (
    <aside dir="rtl" className="mx-auto mt-4 max-w-7xl px-5 lg:px-8" aria-label="إعلانات المدرسة">
      <ul className="space-y-2">
        {items.map(a => (
          <li key={a.id} className="school-glass flex gap-3 p-4 text-forest">
            <Megaphone className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0"><p className="font-bold">{a.title}</p>{a.body && <p className="mt-1 text-sm text-forest/75">{a.body}</p>}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
