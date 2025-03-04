const validationMessages = {
  maxCharacters: (count: number) => `Debe tener máximo ${count} caracteres`,
  minNumbers: (count: number) => `Debe tener al menos ${count} números`,
  maxNumbers: (count: number) => `Debe tener máximo ${count} números`,
  required: "Este campo no puede estar vacío",
  onlyLetters: "Este campo debe contener solo letras",
  onlyNumbers: "Este campo debe contener solo numeros",
};

export { validationMessages };
