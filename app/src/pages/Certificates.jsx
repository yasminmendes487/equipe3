import { Link } from "react-router-dom";
import { Award, Download, Calendar, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { certificates as defaultCerts } from "../data/mock";

export default function Certificates() {
  const { user } = useAuth();
  const certs = defaultCerts.filter((c) => c.userId === user?.id);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link to="/login" className="text-blue-600 hover:underline">
          Faça login para ver seus certificados
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">🏆 Meus Certificados</h1>

      {certs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-14 text-center">
          <Award className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">Nenhum certificado disponível ainda.</p>
          <p className="text-slate-400 text-sm mt-1">
            Conclua sua participação em um evento para receber seu certificado.
          </p>
          <Link
            to="/events"
            className="inline-block mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Explorar Eventos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-xl flex-shrink-0">
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-slate-800 leading-tight mb-2">
                    {cert.eventTitle}
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Emitido em {cert.issueDate}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    Carga horária: {cert.hours}h
                  </div>
                  <p className="text-xs font-mono text-slate-300">#{cert.code}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">
                  ✅ Participação confirmada
                </span>
                <button
                  onClick={() =>
                    alert(`[Mock] Download do certificado ${cert.code} em PDF`)
                  }
                  className="flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Baixar PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
