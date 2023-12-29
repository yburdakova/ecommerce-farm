export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2); 
  let month = (date.getMonth() + 1).toString(); 
  let day = date.getDate().toString();

  month = month.length === 1 ? `0${month}` : month;
  day = day.length === 1 ? `0${day}` : day;

  return `${month}/${day}/${year}`;
};