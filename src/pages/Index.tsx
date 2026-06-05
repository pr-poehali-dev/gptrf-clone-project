import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const TYPING = [
  "продающие тексты",
  "SEO-статьи",
  "посты для соцсетей",
  "письма и рассылки",
  "описания товаров",
];

const TOOLS = [
  { icon: "PenLine", title: "Копирайтинг", desc: "Продающие тексты, лендинги, рекламные креативы под вашу нишу.", tag: "Популярное" },
  { icon: "FileText", title: "SEO-статьи", desc: "Оптимизированные статьи с ключами, которые любят поисковики.", tag: "" },
  { icon: "Mail", title: "Email-рассылки", desc: "Цепляющие письма с высокой открываемостью и кликами.", tag: "" },
  { icon: "MessageSquare", title: "Посты для соцсетей", desc: "Контент-план и посты для Telegram, VK, Instagram.", tag: "" },
  { icon: "ShoppingBag", title: "Карточки товаров", desc: "Описания для маркетплейсов Wildberries и Ozon.", tag: "" },
  { icon: "Languages", title: "Перевод и рерайт", desc: "Перевод, переписывание и улучшение готовых текстов.", tag: "" },
  { icon: "Sparkles", title: "Идеи и брейншторм", desc: "Заголовки, темы, концепции — генератор идей без блоков.", tag: "" },
  { icon: "FileSearch", title: "Анализ текста", desc: "Проверка уникальности, читаемости и тональности.", tag: "" },
];

const STEPS = [
  { n: "01", title: "Опишите задачу", desc: "Введите тему или вставьте готовый текст для обработки." },
  { n: "02", title: "Выберите формат", desc: "Пост, статья, письмо — более 100 шаблонов под любую цель." },
  { n: "03", title: "Получите результат", desc: "AI создаст текст за секунды. Редактируйте и публикуйте." },
];

const STATS = [
  { val: "50K+", label: "пользователей" },
  { val: "10М+", label: "текстов создано" },
  { val: "98%", label: "уникальность" },
  { val: "4.9", label: "рейтинг ★" },
];

const PLANS = [
  { name: "Бесплатно", price: "0", desc: "Чтобы попробовать", features: ["10 000 знаков / мес", "5 базовых форматов", "История запросов"], accent: false, cta: "Начать" },
  { name: "Про", price: "990", desc: "Для регулярной работы", features: ["500 000 знаков / мес", "100+ форматов", "SEO-анализ текстов", "Приоритетная обработка", "Поддержка 24/7"], accent: true, cta: "Подключить Про" },
  { name: "Бизнес", price: "3 490", desc: "Для команд и агентств", features: ["Без ограничений", "API-доступ", "5 рабочих мест", "Персональный менеджер"], accent: false, cta: "Связаться" },
];

const FAQ = [
  { q: "Тексты будут уникальными?", a: "Да. Каждый текст генерируется заново и проходит проверку антиплагиата — средняя уникальность 98%." },
  { q: "На каком языке пишет AI?", a: "Сервис специализируется на русском языке, но умеет переводить и писать на других языках." },
  { q: "Можно ли отменить подписку?", a: "Конечно. Подписка отменяется в один клик в личном кабинете, без скрытых условий." },
  { q: "Есть ли API для интеграции?", a: "Да, на тарифе «Бизнес» доступен полный API для встраивания генерации в ваши продукты." },
];

const REVIEWS = [
  { name: "Анна К.", role: "SMM-специалист", text: "Раньше тратила 3 часа на контент-план. Теперь — 20 минут. Качество отличное." },
  { name: "Дмитрий П.", role: "Владелец магазина", text: "Заполнил 200 карточек товаров за вечер. Продажи на маркетплейсе выросли." },
  { name: "Елена М.", role: "Копирайтер", text: "Использую для черновиков и идей. Экономит кучу времени, тексты живые." },
];

function Typing() {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const w = TYPING[i];
    let t: ReturnType<typeof setTimeout>;
    if (!del && txt.length < w.length) t = setTimeout(() => setTxt(w.slice(0, txt.length + 1)), 65);
    else if (!del && txt.length === w.length) t = setTimeout(() => setDel(true), 1800);
    else if (del && txt.length > 0) t = setTimeout(() => setTxt(txt.slice(0, -1)), 32);
    else { setDel(false); setI((p) => (p + 1) % TYPING.length); }
    return () => clearTimeout(t);
  }, [txt, del, i]);

  return (
    <span className="brand-gradient-text">
      {txt}
      <span className="inline-block w-[3px] h-[0.85em] bg-[#10a37f] ml-1 align-middle" style={{ animation: "blink 1s step-end infinite" }} />
    </span>
  );
}

export default function Index() {
  const [prompt, setPrompt] = useState("");
  const [gen, setGen] = useState(false);
  const [out, setOut] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleGen = () => {
    if (!prompt.trim()) return;
    setGen(true); setOut("");
    const text = `Это демонстрация. По запросу «${prompt}» AI создаст уникальный текст — грамотный, структурированный и готовый к публикации. Подключите AI-модель, чтобы получать настоящие результаты.`;
    let i = 0;
    const iv = setInterval(() => {
      i++; setOut(text.slice(0, i * 3));
      if (i * 3 >= text.length) { clearInterval(iv); setGen(false); }
    }, 22);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/85 backdrop-blur-xl border-b border-border" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center">
              <Icon name="Sparkles" size={18} className="text-white" />
            </div>
            <span className="font-display font-extrabold text-lg">GPT<span className="brand-text">Текст</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground font-medium">
            <a href="#tools" className="hover:text-foreground transition-colors">Инструменты</a>
            <a href="#how" className="hover:text-foreground transition-colors">Как работает</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Тарифы</a>
            <a href="#faq" className="hover:text-foreground transition-colors">Вопросы</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:block text-sm font-medium text-foreground hover:text-[#10a37f] transition-colors">Войти</button>
            <button className="text-sm font-semibold px-5 py-2.5 rounded-full text-white brand-gradient hover:opacity-90 transition-all hover:scale-[1.03]">
              Попробовать
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-[#10a37f]/10 blur-3xl" />
        <div className="absolute top-40 -right-32 w-96 h-96 rounded-full bg-[#1ec9a0]/10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border text-sm font-medium text-[#0d8268] mb-8 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-[#10a37f] animate-pulse" />
            Нейросеть для текстов на русском
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6 animate-slide-up delay-100">
            Создавайте<br /><Typing />
            <br />за секунды
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up delay-200">
            Умный AI-сервис генерирует, переписывает и улучшает любые тексты.
            Экономьте часы работы и публикуйте контент быстрее.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up delay-300">
            <button className="px-7 py-3.5 rounded-full font-semibold text-white brand-gradient soft-shadow hover:scale-[1.03] transition-transform flex items-center gap-2 justify-center">
              <Icon name="Zap" size={18} /> Начать бесплатно
            </button>
            <button className="px-7 py-3.5 rounded-full font-semibold border border-border bg-white hover:bg-secondary transition-colors flex items-center gap-2 justify-center">
              <Icon name="Play" size={16} /> Как это работает
            </button>
          </div>

          {/* Demo card */}
          <div className="mt-16 max-w-3xl mx-auto text-left animate-scale-in delay-400">
            <div className="bg-white rounded-3xl border border-border soft-shadow-lg p-2">
              <div className="flex items-center gap-2 px-4 py-3">
                <span className="w-3 h-3 rounded-full bg-red-300" />
                <span className="w-3 h-3 rounded-full bg-yellow-300" />
                <span className="w-3 h-3 rounded-full bg-green-300" />
                <span className="ml-3 text-xs text-muted-foreground font-medium">GPTТекст — генератор</span>
              </div>
              <div className="bg-secondary/50 rounded-2xl p-5">
                <textarea
                  className="w-full bg-transparent resize-none outline-none text-base placeholder:text-muted-foreground/60"
                  rows={3}
                  placeholder="Напишите пост для Telegram про запуск доставки еды..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span className="px-2.5 py-1 rounded-full bg-white border border-border">Пост</span>
                    <span className="px-2.5 py-1 rounded-full bg-white border border-border hidden sm:inline">Статья</span>
                    <span className="px-2.5 py-1 rounded-full bg-white border border-border hidden sm:inline">Письмо</span>
                  </div>
                  <button
                    onClick={handleGen}
                    disabled={gen || !prompt.trim()}
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white brand-gradient disabled:opacity-50 hover:scale-[1.03] transition-transform"
                  >
                    {gen ? <Icon name="Loader2" size={15} className="animate-spin" /> : <Icon name="Sparkles" size={15} />}
                    {gen ? "Пишу..." : "Создать"}
                  </button>
                </div>
                {out && (
                  <div className="mt-4 p-4 rounded-xl bg-white border border-border text-sm leading-relaxed animate-fade-in">
                    {out}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 py-12 border-y border-border bg-secondary/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-extrabold brand-text">{s.val}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold brand-text uppercase tracking-wider">Инструменты</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 mb-4">Один сервис для любого текста</h2>
            <p className="text-muted-foreground text-lg">Более 100 готовых шаблонов под любую задачу — от поста до большой статьи.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TOOLS.map((t) => (
              <div key={t.title} className="group relative bg-white rounded-2xl border border-border p-6 hover:border-[#10a37f]/40 hover:soft-shadow transition-all duration-300">
                {t.tag && <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full bg-[#10a37f]/10 text-[#0d8268]">{t.tag}</span>}
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:brand-gradient transition-all duration-300">
                  <Icon name={t.icon} size={22} className="text-[#10a37f] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-6 py-24 bg-secondary/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold brand-text uppercase tracking-wider">Как работает</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3">Три шага до готового текста</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s, idx) => (
              <div key={s.n} className="relative">
                <div className="font-display text-6xl font-extrabold text-[#10a37f]/15 mb-2">{s.n}</div>
                <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
                {idx < 2 && <Icon name="ArrowRight" size={24} className="hidden md:block absolute top-8 -right-4 text-[#10a37f]/30" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold brand-text uppercase tracking-wider">Отзывы</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3">Нам доверяют тысячи</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-border p-6 soft-shadow">
                <div className="flex gap-1 mb-4 text-[#10a37f]">
                  {[...Array(5)].map((_, i) => <Icon key={i} name="Star" size={16} className="fill-current" />)}
                </div>
                <p className="text-foreground mb-5 leading-relaxed">«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full brand-gradient flex items-center justify-center text-white font-semibold">{r.name[0]}</div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 py-24 bg-secondary/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold brand-text uppercase tracking-wider">Тарифы</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 mb-4">Честные цены без сюрпризов</h2>
            <p className="text-muted-foreground text-lg">Начните бесплатно, переходите на платный план когда будете готовы.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div key={p.name} className={`relative rounded-3xl p-7 flex flex-col transition-all ${p.accent ? "bg-white border-2 border-[#10a37f] soft-shadow-lg md:-translate-y-3" : "bg-white border border-border"}`}>
                {p.accent && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full text-white brand-gradient whitespace-nowrap">Выгодно</span>}
                <div className="text-sm text-muted-foreground mb-1">{p.desc}</div>
                <div className="font-display font-extrabold text-xl mb-3">{p.name}</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display text-4xl font-extrabold">{p.price} ₽</span>
                  <span className="text-muted-foreground text-sm">/мес</span>
                </div>
                <ul className="space-y-3 flex-1 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Icon name="Check" size={16} className="text-[#10a37f] mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full font-semibold text-sm transition-all hover:scale-[1.02] ${p.accent ? "text-white brand-gradient" : "border border-border text-foreground hover:border-[#10a37f]"}`}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold brand-text uppercase tracking-wider">FAQ</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3">Частые вопросы</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <div key={i} className="bg-white border border-border rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-display font-semibold">{f.q}</span>
                  <Icon name="ChevronDown" size={20} className={`text-muted-foreground transition-transform flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-muted-foreground animate-fade-in">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto rounded-[2rem] brand-gradient p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">Готовы писать в 10 раз быстрее?</h2>
            <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">Зарегистрируйтесь и получите 10 000 знаков бесплатно. Без карты, без обязательств.</p>
            <button className="px-8 py-4 rounded-full bg-white text-[#0d8268] font-bold hover:scale-[1.03] transition-transform inline-flex items-center gap-2">
              <Icon name="Rocket" size={20} /> Создать аккаунт бесплатно
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-12 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center">
              <Icon name="Sparkles" size={15} className="text-white" />
            </div>
            <span className="font-display font-extrabold">GPT<span className="brand-text">Текст</span></span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Конфиденциальность</a>
            <a href="#" className="hover:text-foreground transition-colors">Условия</a>
            <a href="#" className="hover:text-foreground transition-colors">Контакты</a>
          </div>
          <div className="text-sm text-muted-foreground">© 2024 GPTТекст</div>
        </div>
      </footer>
    </div>
  );
}
