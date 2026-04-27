import StatCard from './StatCard';
import { CalendarDays, CreditCard, DollarSign } from 'lucide-react';

const StatSection = () => {
  return (
    <section className="container grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[900px]:*:last:col-span-full max-sm:grid-cols-1">
      <StatCard isCurrency value={100.01} icon={DollarSign}>
        Gasto Mensal
      </StatCard>
      <StatCard isCurrency value={1200.12} icon={CalendarDays}>
        Gasto Anual
      </StatCard>
      <StatCard value={10} icon={CreditCard}>
        Assinaturas Ativas
      </StatCard>
    </section>
  );
};

export default StatSection;
