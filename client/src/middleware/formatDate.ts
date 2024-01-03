export const formatDate = (dateString?: string) => {
  if (!dateString) {
    return 'No date provided'; 
  }
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2); 
  let month = (date.getMonth() + 1).toString(); 
  let day = date.getDate().toString();
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();

  month = month.length === 1 ? `0${month}` : month;
  day = day.length === 1 ? `0${day}` : day;
  hours = hours.length === 1 ? `0${hours}` : hours;
  minutes = minutes.length === 1 ? `0${minutes}` : minutes;

  return `${month}/${day}/${year} ${hours}:${minutes}`;
};