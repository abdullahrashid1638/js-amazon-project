export function convertDate (dateString) {
  const newDate = new Date(dateString);
  const date = newDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  return date;
}