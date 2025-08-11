export function timestampParaMinutosTotais(timestampString: string) {

  const data = new Date(timestampString);
  if (isNaN(data.getTime())) {
    return "Formato de data/hora inválido.";
  }


  const horas = data.getUTCHours();
  const minutos = data.getUTCMinutes();
  const segundos = data.getUTCSeconds();
  const milissegundos = data.getUTCMilliseconds();

  const totalMinutos = (horas * 60) + minutos + (segundos / 60) + (milissegundos / 60000);

  return totalMinutos;
}
