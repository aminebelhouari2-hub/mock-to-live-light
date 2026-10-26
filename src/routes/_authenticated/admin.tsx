import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LogOut, MessageCircle, Phone, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { registrationStatusLabels, type RegistrationStatus } from "@/lib/registrations";
import { AdminGallery, AdminSchedule } from "@/components/admin-content";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم | SALAOUANDJI SCHOOL" },
      { name: "description", content: "لوحة تحكم إدارة صلوانجي سكول." },
      { property: "og:title", content: "لوحة التحكم | SALAOUANDJI SCHOOL" },
      { property: "og:description", content: "لوحة تحكم إدارة صلوانجي سكول." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

interface Registration { id: string; parent_name: string; phone: string; level: string; academic_year: string | null; status: string; admin_notes: string | null; created_at: string }
interface Announcement { id: string; title: string; body: string; published: boolean; created_at: string }

const statuses = Object.keys(registrationStatusLabels) as RegistrationStatus[];
const waNumber = (phone: string) => phone.replace(/\D/g, "").replace(/^0/, "213");

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [regs, setRegs] = useState<Registration[]>([]);
  const [news, setNews] = useState<Announcement[]>([]);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const load = useCallback(async () => {
    const [r, a] = await Promise.all([
      supabase.from("registrations").select("*").order("created_at", { ascending: false }),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
    ]);
    setRegs(r.data ?? []); setNews(a.data ?? []);
  }, []);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const { data } = await supabase.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
      setIsAdmin(Boolean(data));
      if (data) load();
    })();
  }, [load]);

  const filtered = useMemo(() => regs.filter(r => `${r.parent_name} ${r.phone} ${r.level}`.includes(query.trim())), [regs, query]);
  const count = (s: RegistrationStatus) => regs.filter(r => r.status === s).length;

  async function updateReg(id: string, patch: Partial<Pick<Registration, "status" | "admin_notes">>) {
    await supabase.from("registrations").update(patch).eq("id", id);
    setRegs(list => list.map(r => r.id === id ? { ...r, ...patch } : r));
  }
  async function removeReg(id: string) {
    if (!confirm("حذف هذا الطلب؟")) return;
    await supabase.from("registrations").delete().eq("id", id);
    setRegs(list => list.filter(r => r.id !== id));
  }
  async function addNews(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await supabase.from("announcements").insert({ title: title.trim(), body: body.trim() });
    setTitle(""); setBody(""); load();
  }
  async function toggleNews(a: Announcement) {
    await supabase.from("announcements").update({ published: !a.published }).eq("id", a.id);
    setNews(list => list.map(n => n.id === a.id ? { ...n, published: !a.published } : n));
  }
  async function removeNews(id: string) {
    if (!confirm("حذف هذا الإعلان؟")) return;
    await supabase.from("announcements").delete().eq("id", id);
    setNews(list => list.filter(n => n.id !== id));
  }
  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <main dir="rtl" className="school-theme min-h-screen px-4 py-8 text-forest sm:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold sm:text-3xl">لوحة تحكم صلوانجي سكول</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline"><Link to="/">الموقع</Link></Button>
            <Button variant="outline" onClick={signOut}><LogOut />خروج</Button>
          </div>
        </header>

        {isAdmin === false && <p className="school-glass p-6">هذا الحساب ليس لديه صلاحية الإدارة.</p>}
        {isAdmin && <>
          <section className="grid gap-4 sm:grid-cols-4">
            <Stat label="إجمالي الطلبات" value={regs.length} />
            {statuses.map(s => <Stat key={s} label={registrationStatusLabels[s]} value={count(s)} />)}
          </section>

          <Tabs defaultValue="regs" dir="rtl">
            <TabsList className="flex-wrap h-auto"><TabsTrigger value="regs">طلبات التسجيل</TabsTrigger><TabsTrigger value="news">الإعلانات</TabsTrigger><TabsTrigger value="gallery">صور المعرض</TabsTrigger><TabsTrigger value="schedule">مواعيد الحصص</TabsTrigger></TabsList>
            <TabsContent value="gallery"><AdminGallery /></TabsContent>
            <TabsContent value="schedule"><AdminSchedule /></TabsContent>

            <TabsContent value="regs" className="space-y-4">
              <Input placeholder="ابحث بالاسم أو الهاتف أو المستوى" value={query} onChange={e => setQuery(e.target.value)} />
              {!filtered.length && <p className="school-glass p-6 text-forest/70">لا توجد طلبات بعد.</p>}
              {filtered.map(r => (
                <article key={r.id} className="school-glass space-y-3 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div><h2 className="text-lg font-bold">{r.parent_name}</h2><p className="text-sm text-forest/70">{r.level} · {r.academic_year} · {new Date(r.created_at).toLocaleDateString("ar-DZ")}</p></div>
                    <select aria-label="حالة الطلب" value={r.status} onChange={e => updateReg(r.id, { status: e.target.value })} className="rounded-md border border-forest/15 bg-card p-2 text-sm">
                      {statuses.map(s => <option key={s} value={s}>{registrationStatusLabels[s]}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm"><a href={`tel:${r.phone}`} dir="ltr"><Phone />{r.phone}</a></Button>
                    <Button asChild variant="outline" size="sm"><a href={`https://wa.me/${waNumber(r.phone)}`} target="_blank" rel="noopener"><MessageCircle />واتساب</a></Button>
                    <Button variant="ghost" size="sm" onClick={() => removeReg(r.id)}><Trash2 />حذف</Button>
                  </div>
                  <Textarea placeholder="ملاحظات الإدارة" defaultValue={r.admin_notes ?? ""} onBlur={e => e.target.value !== (r.admin_notes ?? "") && updateReg(r.id, { admin_notes: e.target.value })} />
                </article>
              ))}
            </TabsContent>

            <TabsContent value="news" className="space-y-4">
              <form onSubmit={addNews} className="school-glass space-y-3 p-5">
                <Input placeholder="عنوان الإعلان" value={title} onChange={e => setTitle(e.target.value)} required />
                <Textarea placeholder="نص الإعلان (اختياري)" value={body} onChange={e => setBody(e.target.value)} />
                <Button type="submit">نشر الإعلان</Button>
              </form>
              {news.map(a => (
                <article key={a.id} className="school-glass flex flex-wrap items-start justify-between gap-3 p-5">
                  <div className="min-w-0"><h2 className="font-bold">{a.title}</h2>{a.body && <p className="mt-1 text-sm text-forest/75">{a.body}</p>}</div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm"><Switch checked={a.published} onCheckedChange={() => toggleNews(a)} />ظاهر في الموقع</label>
                    <Button variant="ghost" size="sm" onClick={() => removeNews(a.id)}><Trash2 />حذف</Button>
                  </div>
                </article>
              ))}
            </TabsContent>
          </Tabs>
        </>}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="school-glass p-5"><p className="text-sm text-forest/70">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p></div>;
}
