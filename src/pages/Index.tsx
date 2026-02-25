import { useEffect, useState } from "react";
import { ArrowRight, Zap, Shield, Truck, Headphones, Battery, Gauge } from "lucide-react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};
    const sectionIds = ["hero", "features", "how", "pricing", "cta"];

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
        { threshold: 0.15 }
      );

      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/60 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <div className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
              ElectroRide
            </div>
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-white transition-colors">
              Каталог
            </a>
            <a href="#how" className="text-muted-foreground hover:text-white transition-colors">
              Как купить
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">
              Цены
            </a>
          </nav>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 text-sm font-medium border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all">
              О нас
            </button>
            <button className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold">
              Заказать
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-32 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <img src="/images/black-hole-gif.gif" alt="Electric energy animation" className="w-auto h-3/4 object-contain opacity-60" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-blue-950/40" />

        {/* Декоративные элементы */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mb-8 inline-block">
                <span className="text-xs font-medium tracking-widest text-accent/80 uppercase border border-accent/30 rounded-full px-4 py-1.5">
                  ⚡ Электротранспорт нового поколения
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Едь тихо.
                </span>
                <br />
                <span className="text-accent">Едь чисто.</span>
                <br />
                <span className="bg-gradient-to-br from-white via-white to-blue-400/60 bg-clip-text text-transparent">
                  Едь умно.
                </span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
                Широкий выбор электрического транспорта: трициклы, мопеды, велосипеды и самокаты.
                Быстрая доставка, гарантия, сервисное обслуживание.
              </p>
              <div className="flex gap-4 mb-12 flex-col sm:flex-row">
                <button className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3 justify-center">
                  Смотреть каталог
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button className="px-8 py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white">
                  Тест-драйв
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

            <div
              className={`relative h-96 lg:h-[550px] transition-all duration-1000 flex items-center justify-center ${visibleSections["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              {/* Карточки категорий транспорта */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {[
                  { icon: "Bike", label: "Электровелосипеды", count: "120+ моделей", color: "from-accent/20 to-accent/5" },
                  { icon: "Zap", label: "Электромопеды", count: "80+ моделей", color: "from-blue-500/20 to-blue-500/5" },
                  { icon: "Navigation", label: "Электросамокаты", count: "200+ моделей", color: "from-accent/20 to-accent/5" },
                  { icon: "Car", label: "Электротрициклы", count: "60+ моделей", color: "from-blue-500/20 to-blue-500/5" },
                ].map((cat, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-br ${cat.color} border border-accent/20 rounded-2xl p-6 backdrop-blur-sm hover:border-accent/50 transition-all cursor-pointer hover:scale-105`}
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center mb-3">
                      <Icon name={cat.icon} size={20} className="text-accent" />
                    </div>
                    <p className="font-bold text-white text-sm mb-1">{cat.label}</p>
                    <p className="text-xs text-white/50">{cat.count}</p>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-blue-500/20 rounded-3xl blur-3xl -z-10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section — Категории */}
      <section id="features" className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
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
              {
                icon: "Bike",
                title: "Электровелосипеды",
                desc: "Дальность до 120 км на одном заряде. Идеально для городских поездок и загородных прогулок.",
              },
              {
                icon: "Zap",
                title: "Электромопеды",
                desc: "Скорость до 60 км/ч, мощный мотор. Замена автомобилю в городском трафике.",
              },
              {
                icon: "Navigation",
                title: "Электросамокаты",
                desc: "Лёгкие и складные модели для последней мили. От 15 до 50 км/ч на любой вкус.",
              },
              {
                icon: "Car",
                title: "Электротрициклы",
                desc: "Устойчивая платформа для груза и комфорта. Грузоподъёмность до 300 кг.",
              },
              {
                icon: "Battery",
                title: "Мощные аккумуляторы",
                desc: "Литий-ионные батареи с гарантией 2 года. Зарядка от обычной розетки.",
              },
              {
                icon: "Shield",
                title: "Официальная гарантия",
                desc: "До 3 лет гарантии на всю технику. Собственный сервисный центр.",
              },
            ].map((item, i) => {
              const isVisible = visibleSections["features"];
              return (
                <div
                  key={i}
                  className={`group p-8 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-5 transition-all">
                    <Icon name={item.icon} size={22} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                  <div className="mt-5 flex items-center gap-2 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-all">
                    <span>Смотреть модели</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс покупки</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Просто и быстро
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Выбираете", desc: "Подбираете модель из каталога или консультируетесь с нашим специалистом" },
              { num: "02", title: "Тест-драйв", desc: "Приезжаете к нам или вызываете тест-драйв на дом — убеждаетесь лично" },
              { num: "03", title: "Оформляете", desc: "Оплата картой, наличными или в рассрочку без переплат" },
              { num: "04", title: "Получаете", desc: "Доставка до двери за 1–3 дня или самовывоз со склада" },
            ].map((step, i) => {
              const isVisible = visibleSections["how"];
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="group bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 rounded-2xl p-8 h-full flex flex-col justify-between transition-all backdrop-blur-sm cursor-pointer">
                    <div>
                      <div className="text-5xl font-display font-black text-accent mb-4 group-hover:scale-110 transition-transform">
                        {step.num}
                      </div>
                      <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent/40 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Ценовые категории</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                На любой бюджет
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Начальный уровень",
                price: "от 25 000 ₽",
                features: [
                  "Электросамокаты до 35 км/ч",
                  "Электровелосипеды с мотором 250W",
                  "Дальность 40–70 км",
                  "Гарантия 1 год",
                  "Базовый сервис",
                ],
                highlight: false,
                cta: "Смотреть модели",
              },
              {
                name: "Премиум уровень",
                price: "от 85 000 ₽",
                features: [
                  "Электромопеды и трициклы",
                  "Мощность мотора от 1000W",
                  "Дальность 100–150 км",
                  "Гарантия 3 года",
                  "Сервис + выезд мастера",
                ],
                highlight: true,
                cta: "Получить консультацию",
              },
            ].map((plan, i) => {
              const isVisible = visibleSections["pricing"];
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } ${plan.highlight ? "md:scale-105" : ""}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  {plan.highlight && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition" />
                  )}
                  <div
                    className={`relative p-10 border rounded-2xl h-full flex flex-col justify-between backdrop-blur-sm transition-all ${
                      plan.highlight ? "border-accent/40 bg-accent/10" : "border-accent/10 bg-card/50 hover:bg-card/80"
                    }`}
                  >
                    <div>
                      {plan.highlight && (
                        <div className="inline-block text-xs font-bold text-black bg-accent rounded-full px-3 py-1 mb-4 uppercase tracking-wider">
                          Популярный выбор
                        </div>
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
                      className={`w-full px-6 py-4 rounded-xl font-semibold transition-all ${
                        plan.highlight
                          ? "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-xl hover:shadow-accent/40"
                          : "border border-accent/20 hover:border-accent/40 hover:bg-accent/5"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-32 px-6">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="mb-6 inline-block">
            <span className="text-xs font-medium tracking-widest text-accent/80 uppercase border border-accent/30 rounded-full px-4 py-1.5">
              ⚡ Бесплатная консультация
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Готовы пересесть
            </span>
            <br />
            <span className="text-accent">на электро?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
            Оставьте заявку — наш специалист перезвонит, поможет с выбором и ответит на все вопросы.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <button className="group px-10 py-5 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-bold text-lg flex items-center gap-3 mx-auto sm:mx-0">
              Оставить заявку
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <button className="px-10 py-5 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white mx-auto sm:mx-0">
              Позвонить нам
            </button>
          </div>

          {/* Преимущества под CTA */}
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
            <p>© 2025 ElectroRide — Магазин электротранспорта</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Каталог
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Доставка
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Гарантия
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Контакты
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
