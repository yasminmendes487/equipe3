function StatusBadge({ status }) {
  const normalized = status.toLowerCase();

  const styles = {
    aprovado: "bg-green-100 text-green-700",
    pendente: "bg-yellow-100 text-yellow-700",
    recusado: "bg-red-100 text-red-700",
    aberto: "bg-blue-100 text-blue-700",
    encerrado: "bg-gray-100 text-gray-500",
  };

  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
        styles[normalized] || "bg-gray-100 text-gray-500"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;