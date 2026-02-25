import { useState } from "react";
import { CheckCircle } from "lucide-react";

const BACKEND_URL = "https://functions.poehali.dev/0d166383-4f3b-4bd1-a0ea-25794e048296";

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

export default ContactForm;
