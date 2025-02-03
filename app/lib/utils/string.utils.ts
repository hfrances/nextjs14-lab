
export function stringRemoveAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function stringStartsWithCIAI(str: string | undefined | null, pattern: string | undefined | null): boolean {
  const strAux = str ? stringRemoveAccents(str?.toLowerCase()) : str;
  const patternAux = pattern ? stringRemoveAccents(pattern?.toLowerCase()) : str;

  console.log("stringStartsWithCIAI", strAux, patternAux);
  if (strAux && patternAux) {
    return strAux.startsWith(patternAux);
  }
  else {
    return strAux == patternAux;
  }
}

export function stringInitials(str: string): string {
  const split = str.split(' ');

  if (split.length === 1){
    return `${split[0].slice(0,3)}`.toUpperCase();
  }
  else if (split.length === 2) {
    return `${split[0][0] + split[1][0] + split[1].slice(-1)}`.toUpperCase();
  }
  else if (split.length > 2) {
    return `${split[0][0] + split[1][0] + split[2][0]}`.toUpperCase();
  }
  else {
    return "";
  }
}