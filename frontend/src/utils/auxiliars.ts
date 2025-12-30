import dayjs from "dayjs";

export const classNames = (...classes: string[]) => {
  return classes.join(" ");
};

export const isValidCPF = (cpf: string) => {
  const cleaned = cpf.replace(/\D/g, "");

  if (cleaned.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i]) * (10 - i);
  }

  let firstCheck = (sum * 10) % 11;
  if (firstCheck === 10) firstCheck = 0;
  if (firstCheck !== parseInt(cleaned[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned[i]) * (11 - i);
  }

  let secondCheck = (sum * 10) % 11;
  if (secondCheck === 10) secondCheck = 0;

  return secondCheck === parseInt(cleaned[10]);
};

export function capitalizeFirstLetter(str: string) {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1);
}

export function parseDate(dateStr: string) {
  const isBrazilian = /^\d{2}\/\d{2}\/\d{4}$/.test(dateStr);

  if (isBrazilian) {
    return dayjs(dateStr, "DD/MM/YYYY");
  } else {
    return dayjs(dateStr);
  }
}
