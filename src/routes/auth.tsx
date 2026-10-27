import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "دخول الإدارة | SALAOUANDJI SCHOOL" },
      { name: "description", content: "دخول إدارة صلوانجي سكول إلى لوحة التحكم." },
      { property: "og:title", content: "دخول الإدارة | SALAOUANDJI SCHOOL" },
      { property: "og:description", content: "دخول إدارة صلوانجي سكول إلى لوحة التحكم." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setMsg("البريد أو كلمة المرور غير صحيحة.");
    navigate({ to: "/admin", replace: true });
  }

  return (
    <main dir="rtl" className="school-theme grid min-h-screen place-items-center px-5">
      <form onSubmit={submit} className="school-glass w-full max-w-md space-y-5 p-8 text-forest">
        <h1 className="text-2xl font-bold">دخول لوحة التحكم</h1>
        <p className="text-sm text-forest/70">للحسابات المعتمدة من إدارة المدرسة فقط</p>
        <div><Label htmlFor="email">البريد الإلكتروني</Label><Input id="email" type="email" dir="ltr" required value={email} onChange={e => setEmail(e.target.value)} className="mt-2" /></div>
        <div><Label htmlFor="password">كلمة المرور</Label><Input id="password" type="password" dir="ltr" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} className="mt-2" /></div>
        {msg && <p className="text-sm text-forest/80" role="status">{msg}</p>}
        <Button type="submit" disabled={busy} className="h-auto w-full py-3 font-bold">{busy ? "جارٍ الدخول…" : "دخول"}</Button>
      </form>
    </main>
  );
}
