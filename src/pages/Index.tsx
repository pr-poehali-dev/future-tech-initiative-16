import { useEffect, useState } from "react";
import { ArrowRight, Zap, Shield, Truck, Headphones, Phone, Send, X, CheckCircle } from "lucide-react";
import Icon from "@/components/ui/icon";

const BACKEND_URL = "https://functions.poehali.dev/0d166383-4f3b-4bd1-a0ea-25794e048296";
const PHONE = "+7 978 529-04-68";
const PHONE_RAW = "+79785290468";
const TELEGRAM = "https://t.me/+79785290468";

// ---------- Modal форма ----------
type FormType = "lead" | "callback";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  formType: FormType;
  title: string;
  interest?: string;
}

const LeadModal = ({ open, onClose, formType, title, interest = "" }: LeadModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(interest);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMessage(interest);
  }, [interest]);

  useEffect(() => {
    if (open) {
      setDone(false);
      setError("");
    }
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, form_type: formType }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setDone(true);
        setName("");
        setPhone("");
        setMessage("");
      } else {
        setError(data.error || "Ошибка при отправке");
      }
    } catch {
      setError("Ошибка сети. Попробуйте позже.");
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-accent/20 rounded-2xl w-full max-w-md p-8 shadow-2xl shadow-accent/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition">
          <X className="w-5 h-5" />
        </button>

        {done ? (
          <div className="text-center py-8">
            <CheckCircle className="w-14 h-14 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold mb-2">Заявка принята!</h3>
            <p className="text-white/60">Мы перезвоним вам в ближайшее время.</p>
            <button onClick={onClose} className="mt-6 px-8 py-3 bg-accent text-black rounded-full font-semibold hover:shadow-lg hover:shadow-accent/30 transition">
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div>
              <h3 className="text-xl font-display font-bold mb-1">{title}</h3>
              <p className="text-white/50 text-sm">Мы перезвоним в течение 15 минут</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-white/60">Ваше имя *</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Иванов"
                className="bg-background border border-accent/20 focus:border-accent/50 rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-white/60">Телефон *</label>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 900 000-00-00"
                type="tel"
                className="bg-background border border-accent/20 focus:border-accent/50 rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/20"
              />
            </div>

            {formType === "lead" && (
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white/60">Что интересует?</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Например: электровелосипед для города..."
                  className="bg-background border border-accent/20 focus:border-accent/50 rounded-xl px-4 py-3 text-sm outline-none transition resize-none placeholder:text-white/20"
                />
              </div>
            )}

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-xl font-bold transition hover:shadow-lg hover:shadow-accent/30 disabled:opacity-60"
            >
              {loading ? "Отправляю..." : "Отправить заявку"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// ---------- Главная страница ----------
const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [modal, setModal] = useState<{ open: boolean; type: FormType; title: string; interest?: string }>({
    open: false,
    type: "lead",
    title: "",
  });

  const openLead = (interest?: string) =>
    setModal({ open: true, type: "lead", title: "Оставить заявку", interest });
  const openCallback = () =>
    setModal({ open: true, type: "callback", title: "Заказать звонок" });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};
    const sectionIds = ["hero", "features", "gallery", "how", "pricing", "contact", "cta"];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.12 }
      );
      observers[id].observe(element);
    });

    return () => Object.values(observers).forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <LeadModal
        open={modal.open}
        onClose={closeModal}
        formType={modal.type}
        title={modal.title}
        interest={modal.interest}
      />

      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/60 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <div className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
              ElectroRide
            </div>
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-white transition-colors">Каталог</a>
            <a href="#how" className="text-muted-foreground hover:text-white transition-colors">Как купить</a>
            <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">Цены</a>
            <a href="#contact" className="text-muted-foreground hover:text-white transition-colors">Контакты</a>
          </nav>

          <div className="flex gap-3 items-center">
            <a href={`tel:${PHONE_RAW}`} className="hidden md:flex items-center gap-2 text-sm text-accent hover:text-accent/80 font-medium transition">
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
            <button
              onClick={() => openLead()}
              className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all"
            >
              Заказать
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative pt-32 pb-24 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
            alt="Электросамокат"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-blue-950/60" />
        </div>

        <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-8 inline-block">
                <span className="text-xs font-medium tracking-widest text-accent/80 uppercase border border-accent/30 rounded-full px-4 py-1.5">
                  ⚡ Электротранспорт нового поколения
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">Едь тихо.</span><br />
                <span className="text-accent">Едь чисто.</span><br />
                <span className="bg-gradient-to-br from-white via-white to-blue-400/60 bg-clip-text text-transparent">Едь умно.</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
                Широкий выбор электрического транспорта: трициклы, мопеды, велосипеды и самокаты.
                Быстрая доставка, гарантия, сервисное обслуживание.
              </p>
              <div className="flex gap-4 mb-12 flex-col sm:flex-row">
                <button
                  onClick={() => openLead()}
                  className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3 justify-center"
                >
                  Оставить заявку
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button
                  onClick={openCallback}
                  className="px-8 py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white"
                >
                  Заказать звонок
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">500+</div>
                  <p className="text-sm text-white/60">Моделей в наличии</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-2">2 000+</div>
                  <p className="text-sm text-white/60">Довольных клиентов</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">3 года</div>
                  <p className="text-sm text-white/60">Гарантия на технику</p>
                </div>
              </div>
            </div>

            <div className={`relative h-auto transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
                {[
                  { icon: "Bike", label: "Электровелосипеды", count: "120+ моделей", color: "from-accent/20 to-accent/5" },
                  { icon: "Zap", label: "Электромопеды", count: "80+ моделей", color: "from-blue-500/20 to-blue-500/5" },
                  { icon: "Navigation", label: "Электросамокаты", count: "200+ моделей", color: "from-accent/20 to-accent/5" },
                  { icon: "Car", label: "Электротрициклы", count: "60+ моделей", color: "from-blue-500/20 to-blue-500/5" },
                ].map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => openLead(cat.label)}
                    className={`bg-gradient-to-br ${cat.color} border border-accent/20 rounded-2xl p-6 backdrop-blur-sm hover:border-accent/50 transition-all hover:scale-105 text-left`}
                  >
                    <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center mb-3">
                      <Icon name={cat.icon} size={20} className="text-accent" />
                    </div>
                    <p className="font-bold text-white text-sm mb-1">{cat.label}</p>
                    <p className="text-xs text-white/50">{cat.count}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 ${visibleSections["gallery"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { src: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80", label: "Электросамокаты" },
              { src: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80", label: "Электровелосипеды" },
              { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", label: "Городской транспорт" },
              { src: "https://images.unsplash.com/photo-1616442831776-4b26f1eaddb8?w=600&q=80", label: "Электромопеды" },
            ].map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer"
                style={{ transitionDelay: `${i * 100}ms` }}
                onClick={() => openLead(img.label)}
              >
                <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
                  <span className="text-white font-semibold text-sm">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Наш каталог</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-6">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Для каждого — свой транспорт
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              От компактных самокатов до мощных трициклов — найдите идеальный электротранспорт под ваши задачи
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "Bike", title: "Электровелосипеды", desc: "Дальность до 120 км на одном заряде. Идеально для городских поездок и загородных прогулок." },
              { icon: "Zap", title: "Электромопеды", desc: "Скорость до 60 км/ч, мощный мотор. Замена автомобилю в городском трафике." },
              { icon: "Navigation", title: "Электросамокаты", desc: "Лёгкие и складные модели для последней мили. От 15 до 50 км/ч на любой вкус." },
              { icon: "Car", title: "Электротрициклы", desc: "Устойчивая платформа для груза и комфорта. Грузоподъёмность до 300 кг." },
              { icon: "Battery", title: "Мощные аккумуляторы", desc: "Литий-ионные батареи с гарантией 2 года. Зарядка от обычной розетки." },
              { icon: "Shield", title: "Официальная гарантия", desc: "До 3 лет гарантии на всю технику. Собственный сервисный центр." },
            ].map((item, i) => (
              <div
                key={i}
                className={`group p-8 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-700 cursor-pointer ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
                onClick={() => openLead(item.title)}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-5 transition-all">
                  <Icon name={item.icon} size={22} className="text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-all">
                  <span>Узнать цену</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс покупки</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">Просто и быстро</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Выбираете", desc: "Подбираете модель из каталога или консультируетесь с нашим специалистом" },
              { num: "02", title: "Тест-драйв", desc: "Приезжаете к нам или вызываете тест-драйв на дом — убеждаетесь лично" },
              { num: "03", title: "Оформляете", desc: "Оплата картой, наличными или в рассрочку без переплат" },
              { num: "04", title: "Получаете", desc: "Доставка до двери за 1–3 дня или самовывоз со склада" },
            ].map((step, i) => (
              <div
                key={i}
                className={`relative transition-all duration-700 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="group bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 rounded-2xl p-8 h-full flex flex-col justify-between transition-all backdrop-blur-sm">
                  <div>
                    <div className="text-5xl font-display font-black text-accent mb-4 group-hover:scale-110 transition-transform">{step.num}</div>
                    <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < 3 && <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent/40 to-transparent" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Ценовые категории</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">На любой бюджет</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Начальный уровень",
                price: "от 25 000 ₽",
                features: ["Электросамокаты до 35 км/ч", "Электровелосипеды с мотором 250W", "Дальность 40–70 км", "Гарантия 1 год", "Базовый сервис"],
                highlight: false,
                cta: "Смотреть модели",
                interest: "Начальный уровень",
              },
              {
                name: "Премиум уровень",
                price: "от 85 000 ₽",
                features: ["Электромопеды и трициклы", "Мощность мотора от 1000W", "Дальность 100–150 км", "Гарантия 3 года", "Сервис + выезд мастера"],
                highlight: true,
                cta: "Получить консультацию",
                interest: "Премиум уровень",
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`group relative transition-all duration-700 ${visibleSections["pricing"] ? "opacity-100 scale-100" : "opacity-0 scale-95"} ${plan.highlight ? "md:scale-105" : ""}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {plan.highlight && <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition" />}
                <div className={`relative p-10 border rounded-2xl h-full flex flex-col justify-between backdrop-blur-sm transition-all ${plan.highlight ? "border-accent/40 bg-accent/10" : "border-accent/10 bg-card/50 hover:bg-card/80"}`}>
                  <div>
                    {plan.highlight && (
                      <div className="inline-block text-xs font-bold text-black bg-accent rounded-full px-3 py-1 mb-4 uppercase tracking-wider">Популярный выбор</div>
                    )}
                    <h3 className="font-display font-bold text-2xl mb-2">{plan.name}</h3>
                    <p className="text-4xl font-black text-accent mb-8">{plan.price}</p>
                    <ul className="space-y-4 mb-10">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex gap-3 text-sm items-start">
                          <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                          <span className="text-foreground/80">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => openLead(plan.interest)}
                    className={`w-full px-6 py-4 rounded-xl font-semibold transition-all ${plan.highlight ? "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-xl hover:shadow-accent/40" : "border border-accent/20 hover:border-accent/40 hover:bg-accent/5"}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections["contact"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Свяжитесь с нами</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">Мы на связи</span>
            </h2>
          </div>

          <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 ${visibleSections["contact"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <a
              href={`tel:${PHONE_RAW}`}
              className="group flex flex-col items-center gap-4 p-8 border border-accent/20 rounded-2xl bg-card/50 hover:border-accent/50 hover:bg-accent/10 transition-all text-center"
            >
              <div className="w-14 h-14 bg-accent/10 group-hover:bg-accent/20 rounded-2xl flex items-center justify-center transition">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Телефон</p>
                <p className="font-bold text-white text-lg">{PHONE}</p>
                <p className="text-xs text-accent mt-1">Ежедневно 9:00–21:00</p>
              </div>
            </a>

            <a
              href={TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-8 border border-accent/20 rounded-2xl bg-card/50 hover:border-accent/50 hover:bg-accent/10 transition-all text-center"
            >
              <div className="w-14 h-14 bg-accent/10 group-hover:bg-accent/20 rounded-2xl flex items-center justify-center transition">
                <Send className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Telegram</p>
                <p className="font-bold text-white text-lg">+79785290468</p>
                <p className="text-xs text-accent mt-1">Ответим быстро</p>
              </div>
            </a>

            <button
              onClick={openCallback}
              className="group flex flex-col items-center gap-4 p-8 border border-accent/40 rounded-2xl bg-accent/10 hover:border-accent/60 hover:bg-accent/20 transition-all text-center"
            >
              <div className="w-14 h-14 bg-accent/20 group-hover:bg-accent/30 rounded-2xl flex items-center justify-center transition">
                <Headphones className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Обратный звонок</p>
                <p className="font-bold text-white text-lg">Заказать звонок</p>
                <p className="text-xs text-accent mt-1">Перезвоним за 15 минут</p>
              </div>
            </button>
          </div>

          {/* Форма обратной связи */}
          <div className={`mt-12 border border-accent/20 rounded-2xl p-8 bg-card/50 transition-all duration-1000 ${visibleSections["contact"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "200ms" }}>
            <h3 className="text-xl font-display font-bold mb-6">Напишите нам</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-32 px-6 bg-accent/5">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-6 inline-block">
            <span className="text-xs font-medium tracking-widest text-accent/80 uppercase border border-accent/30 rounded-full px-4 py-1.5">
              ⚡ Бесплатная консультация
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">Готовы пересесть</span>
            <br />
            <span className="text-accent">на электро?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
            Оставьте заявку — наш специалист перезвонит, поможет с выбором и ответит на все вопросы.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <button
              onClick={() => openLead()}
              className="group px-10 py-5 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-bold text-lg flex items-center gap-3 mx-auto sm:mx-0"
            >
              Оставить заявку
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <a
              href={`tel:${PHONE_RAW}`}
              className="px-10 py-5 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white mx-auto sm:mx-0 flex items-center gap-3 justify-center"
            >
              <Phone className="w-5 h-5 text-accent" />
              {PHONE}
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-6 h-6 text-accent" />
              <p className="text-sm text-white/60 text-center">Доставка по всей России</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-6 h-6 text-accent" />
              <p className="text-sm text-white/60 text-center">Гарантия до 3 лет</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Headphones className="w-6 h-6 text-accent" />
              <p className="text-sm text-white/60 text-center">Поддержка 7 дней в неделю</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-12 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-accent to-accent/60 rounded-md flex items-center justify-center">
              <Zap className="w-3 h-3 text-black" />
            </div>
            <p>© 2025 ElectroRide</p>
          </div>
          <div className="flex gap-6 items-center flex-wrap justify-center">
            <a href={`tel:${PHONE_RAW}`} className="hover:text-accent transition flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />{PHONE}
            </a>
            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" />Telegram
            </a>
            <a href="#features" className="hover:text-white transition">Каталог</a>
            <a href="#how" className="hover:text-white transition">Как купить</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ---------- Inline форма обратной связи ----------
const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, form_type: "callback" }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setDone(true);
      } else {
        setError(data.error || "Ошибка при отправке");
      }
    } catch {
      setError("Ошибка сети. Попробуйте позже.");
    }
    setLoading(false);
  };

  if (done) {
    return (
      <div className="flex items-center gap-3 text-accent py-4">
        <CheckCircle className="w-6 h-6" />
        <span className="font-semibold">Сообщение отправлено! Мы ответим в ближайшее время.</span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid md:grid-cols-3 gap-4">
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше имя *"
        className="bg-background border border-accent/20 focus:border-accent/50 rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30"
      />
      <input
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Телефон *"
        type="tel"
        className="bg-background border border-accent/20 focus:border-accent/50 rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30"
      />
      <button
        type="submit"
        disabled={loading}
        className="py-3 bg-gradient-to-r from-accent to-accent/90 text-black rounded-xl font-semibold hover:shadow-lg hover:shadow-accent/30 transition disabled:opacity-60"
      >
        {loading ? "Отправляю..." : "Отправить"}
      </button>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ваш вопрос или сообщение"
        rows={2}
        className="md:col-span-3 bg-background border border-accent/20 focus:border-accent/50 rounded-xl px-4 py-3 text-sm outline-none transition resize-none placeholder:text-white/30"
      />
      {error && <p className="text-red-400 text-sm md:col-span-3">{error}</p>}
    </form>
  );
};

export default Index;
