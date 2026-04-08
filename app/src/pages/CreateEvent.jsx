import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EMPTY = {
  title: "",
  description: "",
  date: "",
  location: "",
  vacancies: "",
  price: "",
};

export default function CreateEvent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const errs = {};
    Object.keys(EMPTY).forEach((k) => {
      if (!form[k].toString().trim()) errs[k] = "Campo obrigatório";
    });
    return errs;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      date: form.date,
      location: form.location,
      vacancies: `0/${form.vacancies}`,
      price: /^\d/.test(form.price) ? `R$ ${form.price}` : form.price,
      status: "Aberto",
      organizadorId: user?.id,
    };

    const saved = JSON.parse(localStorage.getItem("ef-custom-events") || "[]");
    saved.push(newEvent);
    localStorage.setItem("ef-custom-events", JSON.stringify(saved));
    setSubmitted(true);
  }

  function inputClass(name) {
    return `w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
      errors[name] ? "border-red-400 bg-red-50" : "border-slate-200"
    }`;
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-10 max-w-md w-full text-center shadow-sm">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Evento Criado!</h2>
          <p className="text-slate-500 text-sm mb-1">
            <strong>{form.title}</strong> foi criado com sucesso.
          </p>
          <p className="text-slate-400 text-xs mb-6">
            Status inicial: <span className="text-blue-600 font-semibold">Rascunho</span> — publique quando estiver pronto.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => { setForm(EMPTY); setSubmitted(false); setErrors({}); }}
              className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors"
            >
              Criar Outro
            </button>
            <button
              onClick={() => navigate("/my-events")}
              className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Meus Eventos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">➕ Criar Evento</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Título do Evento <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="ex: Workshop de React Avançado"
            className={inputClass("title")}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Descrição <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Descreva brevemente o evento..."
            className={inputClass("description")}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Date + Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Data e Horário <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              className={inputClass("date")}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Local <span className="text-red-500">*</span>
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="ex: Auditório Principal"
              className={inputClass("location")}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>
        </div>

        {/* Vacancies + Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Limite de Vagas <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="vacancies"
              value={form.vacancies}
              onChange={handleChange}
              min="1"
              placeholder="ex: 100"
              className={inputClass("vacancies")}
            />
            {errors.vacancies && <p className="text-red-500 text-xs mt-1">{errors.vacancies}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Preço <span className="text-red-500">*</span>
            </label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="ex: 49.90 ou Gratuito"
              className={inputClass("price")}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Criar Evento
          </button>
        </div>
      </form>
    </div>
  );
}
