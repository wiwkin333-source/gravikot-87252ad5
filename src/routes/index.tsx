import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Crosshair,
  Sparkles,
  Cpu,
  Palette,
  Timer,
  ChevronRight,
  Zap,
  Star,
  Plus,
  Minus,
  PawPrint,
  Mail,
  Instagram,
  Send,
} from "lucide-react";
import heroCat from "@/assets/gravicat-hero.png";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const advantages = [
  { icon: Crosshair, title: "Точность до микрона", desc: "Высокоточный лазер с погрешностью менее 0.01 мм для безупречных линий." },
  { icon: Sparkles, title: "Премиальное качество", desc: "Каждое изделие проходит контроль и финишную обработку вручную." },
  { icon: Cpu, title: "Современное оборудование", desc: "Промышленные оптоволоконные и CO₂ лазеры последнего поколения." },
  { icon: Palette, title: "Индивидуальный дизайн", desc: "Разрабатываем макет под ваш бренд, идею или подарок." },
  { icon: Timer, title: "Быстрые сроки", desc: "Срочные заказы — от 24 часов. Большие партии — без задержек." },
  { icon: Zap, title: "Любые материалы", desc: "Металл, дерево, кожа, стекло, акрил, пластик, камень." },
];

const steps = [
  { n: "01", title: "Бриф", desc: "Обсуждаем идею, материал, тираж и сроки." },
  { n: "02", title: "Макет", desc: "Готовим дизайн и согласовываем визуал." },
  { n: "03", title: "Гравировка", desc: "Запускаем лазер — точно, аккуратно, на скорости." },
  { n: "04", title: "Доставка", desc: "Упаковываем как premium-подарок и отправляем." },
];

const reviews = [
  { name: "Анна К.", role: "Бренд-менеджер", text: "Сделали корпоративные подарки для команды — все в восторге. Качество гравировки на металле — космос." },
  { name: "Дмитрий Л.", role: "Основатель Studio NOX", text: "Работаем уже полгода. Скорость, чистота линий и подача — на уровне топовых европейских мастерских." },
  { name: "Марина В.", role: "Дизайнер", text: "Сложный макет на коже — справились идеально. Свечение деталей буквально оживает на свету." },
];

const faqs = [
  { q: "На каких материалах вы работаете?", a: "Металл, нержавейка, латунь, алюминий, дерево, кожа, акрил, стекло, камень, пластик. Если материала нет в списке — спросите, скорее всего сможем." },
  { q: "Можно ли загрузить свой макет?", a: "Да. Принимаем векторные форматы (SVG, AI, PDF, CDR) и растровые (PNG, JPG) в высоком разрешении. При необходимости доработаем макет под лазер." },
  { q: "Сколько занимает изготовление?", a: "Стандартный срок — 2–4 дня. Срочные заказы — от 24 часов. Большие партии обсуждаем индивидуально." },
  { q: "Делаете ли вы маленькие тиражи?", a: "Да, мы работаем от 1 штуки. Минимального заказа нет — подойдёт и подарок одному человеку, и партия на 1000 единиц." },
  { q: "Можно ли увидеть образец заранее?", a: "Делаем тестовый образец для крупных заказов. Для штучных изделий присылаем фото перед отправкой." },
];

function Particles({ count = 28 }: { count?: number }) {
  const [items, setItems] = useState<{ left: number; delay: number; dur: number; size: number; hue: string }[]>([]);
  useEffect(() => {
    setItems(
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        dur: 8 + Math.random() * 10,
        size: 1 + Math.random() * 3,
        hue: Math.random() > 0.5 ? "#29e3ff" : "#ff2bd6",
      })),
    );
  }, [count]);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: `-10px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.hue,
            boxShadow: `0 0 10px ${p.hue}, 0 0 22px ${p.hue}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 font-display font-black tracking-[0.18em] ${className}`}>
      <span className="text-neon-soft">ГРАВИК</span>
      <PawPrint className="h-5 w-5 text-[color:var(--neon-magenta)]" style={{ filter: "drop-shadow(0 0 8px #ff2bd6)" }} />
      <span className="text-neon-soft">Т</span>
    </div>
  );
}

function NeonButton({
  children,
  variant = "primary",
  href = "#cta",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 font-tech font-semibold uppercase tracking-[0.18em] text-sm transition-all duration-300 rounded-md";
  if (variant === "primary") {
    return (
      <a href={href} className={`${base} text-black`}>
        <span
          className="absolute inset-0 rounded-md"
          style={{
            background: "linear-gradient(135deg,#29e3ff,#8b5cf6 50%,#ff2bd6)",
            boxShadow: "0 0 20px rgba(41,227,255,0.5), 0 0 40px rgba(255,43,214,0.35)",
          }}
        />
        <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: "0 0 30px rgba(41,227,255,0.9), 0 0 80px rgba(255,43,214,0.6)" }}
        />
        <span className="relative">{children}</span>
        <ChevronRight className="relative h-4 w-4" />
      </a>
    );
  }
  return (
    <a href={href} className={`${base} neon-border text-white hover:text-[color:var(--neon-blue)]`}
       style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}>
      <span className="relative">{children}</span>
    </a>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/5 transition"
      >
        <span className="font-tech font-semibold text-lg">{q}</span>
        <span className="shrink-0 h-8 w-8 rounded-full grid place-items-center neon-border">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen bg-[#050510] text-foreground overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="fixed inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 radial-glow opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-transparent to-[#050510]" />
      </div>

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
            <Logo className="text-lg" />
            <nav className="hidden md:flex items-center gap-8 text-sm font-tech uppercase tracking-[0.18em] text-muted-foreground">
              <a href="#advantages" className="hover:text-white transition">Преимущества</a>
              <a href="#gallery" className="hover:text-white transition">Работы</a>
              <a href="#process" className="hover:text-white transition">Процесс</a>
              <a href="#faq" className="hover:text-white transition">FAQ</a>
            </nav>
            <a href="#cta" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg neon-border text-sm font-tech uppercase tracking-[0.18em]">
              Заказать <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20">
        <Particles count={36} />
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="beam" style={{ top: "18%" }} />
          <div className="beam delay-1" />
          <div className="beam delay-2" />
        </div>

        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-tech uppercase tracking-[0.25em] text-[color:var(--neon-blue)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--neon-blue)] animate-pulse" />
              Ваш персональный лазер
            </div>
            <h1 className="mt-6 font-display font-black uppercase leading-[0.95] text-[clamp(2.4rem,6vw,5.2rem)]">
              <span className="block shimmer-text">Скидка 27%</span>
              <span className="block text-white text-neon">до конца недели</span>
              <span className="block text-white/80 text-[0.55em] tracking-wide">на персональную лазерную гравировку</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Создаём премиальную лазерную гравировку на металле, дереве, коже и аксессуарах —
              <span className="text-white"> быстро, точно и с характером.</span>
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <NeonButton variant="primary">Заказать гравировку</NeonButton>
              <NeonButton variant="ghost" href="#gallery">Посмотреть работы</NeonButton>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { v: "10K+", l: "изделий" },
                { v: "0.01мм", l: "точность" },
                { v: "24ч", l: "срочный заказ" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-bold text-neon-soft">{s.v}</div>
                  <div className="mt-1 text-xs font-tech uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div aria-hidden className="absolute inset-0 -m-10">
              <div className="absolute inset-0 rounded-full blur-3xl opacity-60"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.55), transparent 60%)" }} />
            </div>
            <div className="relative animate-float">
              <div className="absolute inset-0 -m-6 rounded-[2rem] animate-spin-slow opacity-50"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0deg, #29e3ff 60deg, transparent 120deg, #ff2bd6 240deg, transparent 300deg)",
                  WebkitMask: "radial-gradient(closest-side, transparent 70%, #000 71%)",
                  mask: "radial-gradient(closest-side, transparent 70%, #000 71%)",
                }}
              />
              <div className="relative rounded-[2rem] overflow-hidden glass animate-pulse-glow">
                <img
                  src={heroCat}
                  alt="ГРАВИКОТ — неоновый кот в защитных очках, маскот бренда лазерной гравировки"
                  width={1024}
                  height={1024}
                  className="w-full h-auto block"
                />
              </div>
              {/* floating chips */}
              <div className="absolute -left-4 top-10 glass rounded-xl px-3 py-2 text-xs font-tech uppercase tracking-[0.18em] animate-float" style={{ animationDelay: "1.5s" }}>
                <span className="text-[color:var(--neon-blue)]">●</span> Laser online
              </div>
              <div className="absolute -right-4 bottom-16 glass rounded-xl px-3 py-2 text-xs font-tech uppercase tracking-[0.18em] animate-float" style={{ animationDelay: "2.2s" }}>
                Power <span className="text-[color:var(--neon-magenta)]">100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="font-tech text-sm uppercase tracking-[0.3em] text-[color:var(--neon-blue)]">Преимущества</p>
            <h2 className="mt-3 font-display font-black uppercase text-4xl md:text-5xl leading-tight">
              Почему выбирают <span className="shimmer-text">ГРАВИКОТ</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Технологии, эстетика и характер — в каждом миллиметре.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group relative glass rounded-2xl p-7 hover:-translate-y-1 transition-all duration-500">
                <div aria-hidden className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none"
                  style={{ boxShadow: "0 0 0 1px rgba(41,227,255,0.4), 0 20px 60px -10px rgba(139,92,246,0.4)" }} />
                <div className="h-12 w-12 grid place-items-center rounded-xl neon-border">
                  <Icon className="h-5 w-5 text-[color:var(--neon-blue)]" />
                </div>
                <h3 className="mt-6 font-display text-xl uppercase tracking-wider">{title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-tech text-sm uppercase tracking-[0.3em] text-[color:var(--neon-magenta)]">Галерея</p>
              <h2 className="mt-3 font-display font-black uppercase text-4xl md:text-5xl leading-tight">
                Работы, которые <span className="text-neon">светятся</span>
              </h2>
            </div>
            <a href="#cta" className="text-sm font-tech uppercase tracking-[0.2em] text-[color:var(--neon-blue)] hover:text-white transition inline-flex items-center gap-2">
              Хочу такое <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[g1, g2, g3, g4, g5, g6].map((src, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden glass aspect-square">
                <img src={src} alt={`Работа ${i + 1}`} loading="lazy" width={800} height={800}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 group-hover:translate-y-0 transition">
                  <div className="font-tech text-xs uppercase tracking-[0.25em] text-[color:var(--neon-blue)]">#{String(i + 1).padStart(2, "0")}</div>
                  <div className="font-display text-lg mt-1">
                    {["Metal Series", "Wood Mandala", "Leather Edge", "Pendant Nox", "Glass Aura", "Phantom Case"][i]}
                  </div>
                </div>
                <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(41,227,255,0.5), inset 0 0 40px rgba(255,43,214,0.25)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="font-tech text-sm uppercase tracking-[0.3em] text-[color:var(--neon-violet)]">Процесс</p>
            <h2 className="mt-3 font-display font-black uppercase text-4xl md:text-5xl leading-tight">
              Как мы <span className="shimmer-text">работаем</span>
            </h2>
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            <div aria-hidden className="hidden lg:block absolute left-0 right-0 top-12 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #29e3ff, #8b5cf6, #ff2bd6, transparent)" }} />
            {steps.map((s) => (
              <div key={s.n} className="relative glass rounded-2xl p-7">
                <div className="font-display text-5xl font-black text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(41,227,255,0.6)" }}>
                  {s.n}
                </div>
                <h3 className="mt-4 font-display text-xl uppercase tracking-wider">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="font-tech text-sm uppercase tracking-[0.3em] text-[color:var(--neon-blue)]">Отзывы</p>
            <h2 className="mt-3 font-display font-black uppercase text-4xl md:text-5xl leading-tight">
              О нас <span className="text-neon">говорят</span>
            </h2>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <div key={r.name} className="glass rounded-2xl p-7 flex flex-col">
                <div className="flex gap-1 text-[color:var(--neon-magenta)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-foreground/90 leading-relaxed flex-1">"{r.text}"</p>
                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="font-tech uppercase tracking-wider">{r.name}</div>
                  <div className="text-sm text-muted-foreground">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="font-tech text-sm uppercase tracking-[0.3em] text-[color:var(--neon-magenta)]">FAQ</p>
            <h2 className="mt-3 font-display font-black uppercase text-4xl md:text-5xl leading-tight">
              Частые <span className="shimmer-text">вопросы</span>
            </h2>
          </div>
          <div className="mt-12 space-y-3">
            {faqs.map((f) => <FAQItem key={f.q} {...f} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta" className="relative py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative rounded-[2rem] overflow-hidden p-10 md:p-16 glass">
            <div aria-hidden className="absolute inset-0">
              <div className="absolute inset-0 radial-glow opacity-90" />
              <div className="beam" style={{ top: "40%" }} />
            </div>
            <Particles count={20} />
            <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
              <div>
                <p className="font-tech text-sm uppercase tracking-[0.3em] text-[color:var(--neon-blue)]">Готовы начать?</p>
                <h2 className="mt-4 font-display font-black uppercase text-4xl md:text-6xl leading-[0.95]">
                  Запустим ваш <span className="shimmer-text">лазер</span>
                </h2>
                <p className="mt-5 text-lg text-muted-foreground max-w-xl">
                  Расскажите о проекте — пришлём идеи, цены и срок за пару часов.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <NeonButton variant="primary" href="mailto:hello@gravikot.ru">Заказать гравировку</NeonButton>
                  <NeonButton variant="ghost" href="#gallery">Посмотреть работы</NeonButton>
                </div>
              </div>
              <div className="relative">
                <div className="glass rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 grid place-items-center rounded-lg neon-border">
                      <Mail className="h-4 w-4 text-[color:var(--neon-blue)]" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-tech">Email</div>
                      <div className="font-tech">hello@gravikot.ru</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 grid place-items-center rounded-lg neon-border">
                      <Send className="h-4 w-4 text-[color:var(--neon-violet)]" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-tech">Telegram</div>
                      <div className="font-tech">@gravikot</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 grid place-items-center rounded-lg neon-border">
                      <Instagram className="h-4 w-4 text-[color:var(--neon-magenta)]" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-tech">Instagram</div>
                      <div className="font-tech">@gravikot.studio</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-between gap-4">
          <Logo />
          <div className="text-xs font-tech uppercase tracking-[0.25em] text-muted-foreground">
            Точность · Стиль · Качество
          </div>
          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} ГРАВИКОТ</div>
        </div>
      </footer>
    </div>
  );
}
