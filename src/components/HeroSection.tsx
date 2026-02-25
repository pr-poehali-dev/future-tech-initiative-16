import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";

const PHONE = "+7 978 529-04-68";
const PHONE_RAW = "+79785290468";

interface HeroSectionProps {
  visibleSections: Record<string, boolean>;
  onOpenLead: (interest?: string) => void;
  onOpenCallback: () => void;
}

const HeroSection = ({ visibleSections, onOpenLead, onOpenCallback }: HeroSectionProps) => {
  return (
    <>
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
                  onClick={() => onOpenLead()}
                  className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3 justify-center"
                >
                  Оставить заявку
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button
                  onClick={onOpenCallback}
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
                    onClick={() => onOpenLead(cat.label)}
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
                onClick={() => onOpenLead(img.label)}
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
    </>
  );
};

export { PHONE, PHONE_RAW };
export default HeroSection;
