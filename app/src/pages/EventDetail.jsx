import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { events } from "../data/events";
import StatusBadge from "../components/StatusBadge";

const PAYMENT_METHODS = ["PIX", "Cartão de Crédito", "Boleto Bancário"];

export default function EventDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === Number(id));

  const [showModal, setShowModal] = useState(false);
  const [method, setMethod] = useState("PIX");
  const [step, setStep] = useState("form"); // "form" | "processing" | "done"
  const [paymentResult, setPaymentResult] = useState(null);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 text-lg mb-4">Evento não encontrado.</p>
          <Link to="/events" className="text-blue-600 hover:underline text-sm">← Voltar para eventos</Link>
        </div>
      </div>
    );
  }

  const savedRegs = JSON.parse(localStorage.getItem("ef-registrations") || "[]");
  const alreadyRegistered = user && savedRegs.some(
    (r) => r.eventId === event.id && r.userId === user.id
  );

  function handleConfirmPayment() {
    setStep("processing");
    setTimeout(() => {
      // Boleto → Pendente; PIX/Cartão → Aprovado (mock)
      const result = method === "Boleto Bancário" ? "Pendente" : "Aprovado";
      setPaymentResult(result);

      const newReg = {
        id: Date.now(),
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        userId: user.id,
        paymentStatus: result,
        status: result === "Aprovado" ? "Confirmado" : "Pendente de Pagamento",
        checkedIn: false,
        paymentMethod: method,
      };

      const existing = JSON.parse(localStorage.getItem("ef-registrations") || "[]");
      existing.push(newReg);
      localStorage.setItem("ef-registrations", JSON.stringify(existing));
      setStep("done");
    }, 2000);
  }

  function resetModal() {
    setShowModal(false);
    setStep("form");
    setMethod("PIX");
    setPaymentResult(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h1 className="text-2xl font-bold text-slate-800">🎪 {event.title}</h1>
          <div className="flex-shrink-0">
            <StatusBadge status={event.status} />
          </div>
        </div>

        <p className="text-slate-600 mb-6 leading-relaxed">{event.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm text-slate-700">
          <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-3">
            <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-3">
            <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-3">
            <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>{event.vacancies} vagas</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-3 font-semibold text-slate-800">
            💰 {event.price}
          </div>
        </div>

        {/* CTA based on role/state */}
        {user?.role === "participante" && (
          <>
            {alreadyRegistered ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm font-medium">
                ✅ Você já está inscrito neste evento.{" "}
                <Link to="/my-registrations" className="underline hover:no-underline">
                  Ver minhas inscrições →
                </Link>
              </div>
            ) : event.status === "Encerrado" ? (
              <div className="bg-slate-100 rounded-xl p-4 text-slate-500 text-sm text-center">
                Este evento está encerrado para novas inscrições.
              </div>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Inscrever-se
              </button>
            )}
          </>
        )}

        {!user && (
          <Link
            to="/login"
            className="block w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-center hover:bg-blue-700 transition-colors"
          >
            Entrar para se inscrever
          </Link>
        )}
      </div>

      {/* ── Payment Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">

            {step === "form" && (
              <>
                <h2 className="text-xl font-bold text-slate-800 mb-1">Confirmar Inscrição</h2>
                <p className="text-slate-400 text-sm mb-6">{event.title}</p>

                <div className="bg-slate-50 rounded-xl p-4 mb-5 flex justify-between text-sm">
                  <span className="text-slate-600">Valor total</span>
                  <span className="font-semibold text-slate-800">{event.price}</span>
                </div>

                <p className="text-sm font-semibold text-slate-700 mb-3">Forma de pagamento</p>
                <div className="space-y-2 mb-6">
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                        method === m
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="method"
                        checked={method === m}
                        onChange={() => setMethod(m)}
                        className="accent-blue-600"
                      />
                      <span className="text-sm font-medium text-slate-800">{m}</span>
                      {m === "Boleto Bancário" && (
                        <span className="text-xs text-slate-400 ml-auto">Aprovação em até 3 dias</span>
                      )}
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => { resetModal(); }}
                    className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-700 text-sm hover:bg-slate-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Confirmar
                  </button>
                </div>
              </>
            )}

            {step === "processing" && (
              <div className="text-center py-10">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-600 font-medium">Processando pagamento...</p>
              </div>
            )}

            {step === "done" && (
              <div className="text-center py-4">
                <div className="text-5xl mb-4">{paymentResult === "Aprovado" ? "✅" : "⏳"}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {paymentResult === "Aprovado" ? "Inscrição Confirmada!" : "Aguardando Confirmação"}
                </h3>
                <p className="text-slate-500 text-sm mb-6">
                  {paymentResult === "Aprovado"
                    ? "Pagamento aprovado. Sua presença está garantida!"
                    : "Boleto gerado. Sua inscrição será confirmada após o pagamento."}
                </p>
                <button
                  onClick={() => { resetModal(); navigate("/my-registrations"); }}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Ver Minhas Inscrições
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
