



function formatToIsoLocalDate( date: Date): string{
  const pad2 = (n: number) => String(n).padStart(2,'0');
  return date ? `${date.getFullYear()}-${pad2(date.getMonth()+1)}-${pad2(date.getDate())}` : '';
}

function formatToFrLocalDate( date: Date): string{
  return date ? `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` : '';
}

function formatToRelativeFrLocalDate(date: Date): string{
  return date ? `${date.getDate()}/${date.getMonth()+1}` : '';
}

function rollUpDate(date: Date): Date{
  let nextDay = new Date(date);
  nextDay.setDate(date.getDate()+1);
  return nextDay;
}

export function useDateService() {
  return {
    formatToIsoLocalDate,
    rollUpDate,
    formatToFrLocalDate,
    formatToRelativeFrLocalDate
  }
}
