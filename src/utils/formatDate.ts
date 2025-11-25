/**
 * Formatea una fecha en formato español (día, mes, año)
 * @param dateString - Fecha en formato ISO (YYYY-MM-DD)
 * @returns Fecha formateada en español (ej: "25 de noviembre de 2025")
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
