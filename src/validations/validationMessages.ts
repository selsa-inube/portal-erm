const validationMessages = {
  maxCharacters: (count: number) => `Debe tener máximo ${count} caracteres`,
  minNumbers: (count: number) => `Debe tener al menos ${count} números`,
  maxNumbers: (count: number) => `Debe tener máximo ${count} números`,
  maxDays: (count: number) => `Debe tener máximo ${count} dias`,
  required: "Este campo no puede estar vacío",
  onlyLetters: "Este campo debe contener solo letras",
  onlyNumbers: "Este campo debe contener solo numeros",
  date: "Formato de fecha incorrecto. Ejemplo de formato: 01/Ene/1990.",
  notPastDate: "La fecha no puede ser anterior o igual al día actual",
};

export { validationMessages };
