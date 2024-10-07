// app/ui/fonts.ts
import { Inter, Lusitana } from 'next/font/google';

// Asegúrate de que los subsets sean válidos para las fuentes que estás importando
export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
});