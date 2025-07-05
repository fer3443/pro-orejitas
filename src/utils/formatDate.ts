import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, "dd 'de' MMMM yyyy", { locale: es });
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return '';
  }
};