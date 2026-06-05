import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const TYPING_PHRASES = [
  "продающие тексты для бизнеса",
  "статьи и SEO-контент",
  "посты для соцсетей",
  "письма и рассылки",
  "сценарии и диалоги",
  "описания товаров",
];

const FEATURES = [
  {
    icon: "Zap",
    title: "Мгновенная генерация",
    desc: "Тексты любого объёма за секунды. Укажите тему — AI напишет за вас.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: "RefreshCw",
    title: "Умное редактирование",
    desc: "Перепишите, сократите, улучшите стиль одним кликом.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: "Globe",
    title: "100+ форматов",
    desc: "Статья, пост, письмо, лендинг — выберите формат и получите готовый текст.",
    color: "from-pink-500 to-orange-400",
  },
  {
    icon: "ShieldCheck",
    title: "Без плагиата",
    desc: "Каждый текст уникален. Проходит проверку антиплагиата с первого раза.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: "Languages",
    title: "Русский язык",
    desc: "Специализируемся на русскоязычных текстах — грамотно и естественно.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: "BarChart2",
    title: "Аналитика текстов",
    desc: "Читаемость, SEO-оценка, тональность — всё в одном дашборде.",
    color: "from-emerald-500 to-cyan-500",
  },
];

const PLANS = [
  {
    name: "Старт",
    price: "990",
    period: "мес",
    desc: "Для частных задач",
    features: ["50 000 знаков / мес", "10 форматов текста", "Базовое редактирование", "Email-поддержка"],
    accent: false,
  },
  {
    name: "Про",
    price: "2 490",
    period: "мес",
    desc: "Для профессионалов",
    features: ["300 000 знаков / мес", "100+ форматов", "Умное редактирование", "SEO-анализ", "Приоритетная поддержка"],
    accent: true,
  },
  {
    name: "Бизнес",
    price: "6 990",
    period: "мес",
    desc: "Для команд и агентств",
    features: ["Без ограничений", "API-доступ", "5 рабочих мест", "Персональный менеджер", "White-label"],
    accent: false,
  },
];

const DEMO_RESULTS = [
  {
    label: "Пост для Instagram",
    text: "🚀 Хотите увеличить продажи без лишних затрат? Наш новый продукт делает именно это — быстро, просто и эффективно. Уже 10 000+ клиентов доверяют нам свой бизнес. Попробуйте бесплатно сегодня и убедитесь сами! 👇",
  },
  {
    label: "Email-рассылка",
    text: "Добрый день! Мы рады сообщить о запуске обновлённой версии нашего сервиса. Теперь вы можете создавать тексты ещё быстрее и качественнее. Специально для вас — скидка 30% в первый месяц.",
  },
  {
    label: "SEO-статья",
    text: "Генерация текстов с помощью искусственного интеллекта — это современный способ создания контента для бизнеса. AI-инструменты позволяют сократить время написания статей в 10 раз, сохраняя при этом высокое качество и уникальность материала.",
  },
];

function TypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < phrase.length) {
      timeout = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % TYPING_PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIndex]);

  return (
    <span className="gradient-text">
      {displayed}
      <span
        className="inline-block w-0.5 h-[0.9em] bg-purple-400 ml-1 align-middle"
        style={{ animation: "blink 1s step-end infinite" }}
      />
    </span>
  );
}

function Orb({ size, x, y, delay, color }: { size: number; x: string; y: string; delay: string; color: string }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
        filter: `blur(${size * 0.45}px)`,
        opacity: 0.18,
        animation: `pulse-glow 5s ease-in-out infinite`,
        animationDelay: delay,
      }}
    />
  );
}

export default function Index() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setGeneratedText("");
    const text = `Это демонстрация работы AI. Ваш запрос «${prompt}» обрабатывается. После подключения AI-модели здесь появится настоящий сгенерированный текст по вашей теме — уникальный, грамотный и готовый к публикации.`;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setGeneratedText(text.slice(0, i * 3));
      if (i * 3 >= text.length) {
        clearInterval(interval);
        setGenerating(false);
      }
    }, 25);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #4f8eff, #8b5cf6)" }}
            >
              <Icon name="Sparkles" size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Neural<span className="gradient-text">Text</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Возможности</a>
            <a href="#demo" className="hover:text-foreground transition-colors">Демо</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Цены</a>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5">
              Войти
            </button>
            <button
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #4f8eff, #8b5cf6)" }}
            >
              Начать бесплатно
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <Orb size={700} x="-15%" y="-10%" delay="0s" color="radial-gradient(circle, #4f8eff, transparent)" />
        <Orb size={600} x="55%" y="5%" delay="1.5s" color="radial-gradient(circle, #8b5cf6, transparent)" />
        <Orb size={450} x="25%" y="55%" delay="3s" color="radial-gradient(circle, #ec4899, transparent)" />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(79,142,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,255,0.04) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-slide-up"
            style={{
              background: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#c4b5fd",
            }}
          >
            <Icon name="Sparkles" size={14} />
            Новый уровень работы с текстом
          </div>

          <h1
            className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-slide-up delay-100"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.02em" }}
          >
            AI пишет
            <br />
            <TypingText />
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up delay-200">
            Мощный искусственный интеллект генерирует тексты любой сложности.
            Сэкономьте часы работы — получите результат за секунды.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-300">
            <button
              className="group relative px-8 py-4 rounded-xl font-bold text-white text-lg overflow-hidden transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #4f8eff 0%, #8b5cf6 50%, #ec4899 100%)",
                boxShadow: "0 0 40px rgba(139,92,246,0.4)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                <Icon name="Zap" size={20} />
                Попробовать бесплатно
              </span>
            </button>

            <button
              className="px-8 py-4 rounded-xl font-semibold text-lg text-foreground hover:bg-white/5 transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <span className="flex items-center gap-2 justify-center">
                <Icon name="Play" size={18} />
                Смотреть демо
              </span>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto animate-slide-up delay-400">
            {[
              { val: "50K+", label: "пользователей" },
              { val: "10M+", label: "текстов создано" },
              { val: "4.9★", label: "рейтинг" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black gradient-text" style={{ fontFamily: "Montserrat, sans-serif" }}>{s.val}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating card */}
        <div className="absolute right-10 bottom-24 hidden xl:block animate-float">
          <div
            className="gradient-border p-5 rounded-2xl w-72"
            style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-muted-foreground">Генерирую текст...</span>
            </div>
            <div className="space-y-2">
              {[100, 85, 70].map((w, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full"
                  style={{
                    width: `${w}%`,
                    background: "linear-gradient(90deg, rgba(79,142,255,0.4), rgba(139,92,246,0.4))",
                    animation: `shimmer 2s linear infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Всё для работы с <span className="gradient-text">текстом</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Полный набор инструментов для создания, редактирования и анализа контента
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group gradient-border p-6 rounded-2xl hover:bg-white/[0.03] transition-all duration-300 cursor-default"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${f.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon name={f.icon} size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="py-24 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Попробуйте прямо <span className="gradient-text">сейчас</span>
            </h2>
            <p className="text-muted-foreground text-lg">Введите задачу — и AI напишет текст за вас</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input */}
            <div className="gradient-border rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
              <label className="block text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                Ваш запрос
              </label>
              <textarea
                className="w-full bg-transparent text-foreground text-base resize-none outline-none placeholder:text-muted-foreground/40 leading-relaxed"
                rows={6}
                placeholder="Например: напиши продающий пост для Instagram про доставку еды..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                <select className="flex-1 bg-secondary text-sm rounded-lg px-3 py-2 border border-border outline-none text-foreground">
                  <option>Пост для соцсетей</option>
                  <option>SEO-статья</option>
                  <option>Email-письмо</option>
                  <option>Описание товара</option>
                  <option>Лендинг (секция)</option>
                </select>
                <button
                  onClick={handleGenerate}
                  disabled={generating || !prompt.trim()}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-white text-sm transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  style={{ background: "linear-gradient(135deg, #4f8eff, #8b5cf6)" }}
                >
                  {generating ? (
                    <Icon name="Loader2" size={16} className="animate-spin" />
                  ) : (
                    <Icon name="Sparkles" size={16} />
                  )}
                  {generating ? "Генерирую..." : "Создать"}
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="gradient-border rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
              {generatedText ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Готово</span>
                  </div>
                  <p className="text-foreground leading-relaxed">{generatedText}</p>
                  <button className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="Copy" size={14} />
                    Копировать
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-5">
                    <Icon name="Eye" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Примеры результатов</span>
                  </div>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {DEMO_RESULTS.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveDemo(i)}
                        className="text-xs px-3 py-1.5 rounded-lg transition-all"
                        style={
                          activeDemo === i
                            ? { background: "linear-gradient(135deg,#4f8eff,#8b5cf6)", color: "white" }
                            : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }
                        }
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed text-sm">{DEMO_RESULTS[activeDemo].text}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Простые <span className="gradient-text">тарифы</span>
            </h2>
            <p className="text-muted-foreground text-lg">Выберите подходящий план и начните прямо сейчас</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="relative rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: plan.accent
                    ? "linear-gradient(135deg, rgba(79,142,255,0.12), rgba(139,92,246,0.18))"
                    : "rgba(255,255,255,0.03)",
                  border: plan.accent
                    ? "1px solid rgba(139,92,246,0.5)"
                    : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: plan.accent ? "0 0 40px rgba(139,92,246,0.2)" : "none",
                }}
              >
                {plan.accent && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full text-white whitespace-nowrap"
                    style={{ background: "linear-gradient(135deg,#4f8eff,#8b5cf6)" }}
                  >
                    Популярный
                  </div>
                )}
                <div className="mb-6">
                  <div className="text-sm text-muted-foreground mb-1">{plan.desc}</div>
                  <div className="font-black text-2xl" style={{ fontFamily: "Montserrat, sans-serif" }}>{plan.name}</div>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black gradient-text" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {plan.price} ₽
                    </span>
                    <span className="text-muted-foreground text-sm">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Icon name="Check" size={15} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={
                    plan.accent
                      ? { background: "linear-gradient(135deg,#4f8eff,#8b5cf6)", color: "white" }
                      : { border: "1px solid rgba(255,255,255,0.12)", color: "white" }
                  }
                >
                  Выбрать план
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="relative rounded-3xl p-12 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(79,142,255,0.12), rgba(139,92,246,0.18), rgba(236,72,153,0.12))",
              border: "1px solid rgba(139,92,246,0.3)",
            }}
          >
            <Orb size={350} x="65%" y="-40%" delay="0s" color="radial-gradient(circle, #8b5cf6, transparent)" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Начните писать лучше <span className="gradient-text">уже сегодня</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                14 дней бесплатно. Без привязки карты. Без ограничений на первые 50 000 знаков.
              </p>
              <button
                className="px-10 py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #4f8eff, #8b5cf6, #ec4899)",
                  boxShadow: "0 0 60px rgba(139,92,246,0.4)",
                }}
              >
                <span className="flex items-center gap-2 justify-center">
                  <Icon name="Rocket" size={22} />
                  Создать аккаунт — бесплатно
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#4f8eff,#8b5cf6)" }}
            >
              <Icon name="Sparkles" size={12} className="text-white" />
            </div>
            <span className="font-bold" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Neural<span className="gradient-text">Text</span>
            </span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-foreground transition-colors">Условия использования</a>
            <a href="#" className="hover:text-foreground transition-colors">Контакты</a>
          </div>
          <div className="text-sm text-muted-foreground">© 2024 NeuralText. Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
}