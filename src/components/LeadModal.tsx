import { useEffect, useState } from "react";
import { X, CheckCircle } from "lucide-react";

const BACKEND_URL = "https://functions.poehali.dev/0d166383-4f3b-4bd1-a0ea-25794e048296";

export type FormType = "lead" | "callback";

export interface LeadModalProps {
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

export default LeadModal;
