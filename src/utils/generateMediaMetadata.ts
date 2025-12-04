/**
 * Genera metadata dinámica para páginas de películas y series
 * @param id - ID del medio (película o serie)
 * @param fetchFn - Función para obtener los detalles del medio
 * @param titleKey - Clave del objeto que contiene el título ('title' para películas, 'name' para series)
 * @returns Objeto de metadata con el título formateado
 */
export async function generateMediaMetadata<T extends Record<string, unknown>>(
  id: string,
  fetchFn: (id: string) => Promise<T>,
  titleKey: keyof T
) {
  const media = await fetchFn(id);
  const title = media[titleKey] as string;

  return {
    title,
  };
}
