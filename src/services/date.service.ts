

function formatToIsoLocalDate( date: Date): string{
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

function formatToFrLocalDate( date: Date): string{
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
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
    formatToFrLocalDate
  }
}
