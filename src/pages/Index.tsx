import { useEffect, useState } from "react";
import { Zap, Phone } from "lucide-react";
import LeadModal, { FormType } from "@/components/LeadModal";
import HeroSection, { PHONE, PHONE_RAW } from "@/components/HeroSection";
import ContentSections from "@/components/ContentSections";

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

      <HeroSection
        visibleSections={visibleSections}
        onOpenLead={openLead}
        onOpenCallback={openCallback}
      />

      <ContentSections
        visibleSections={visibleSections}
        onOpenLead={openLead}
        onOpenCallback={openCallback}
      />
    </div>
  );
};

export default Index;
