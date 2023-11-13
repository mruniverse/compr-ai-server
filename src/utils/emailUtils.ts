export function getEmailsFromString(emails: string) {
  if (!emails.includes(',')) return emails;
  const emailsArray = emails.split(',');
  return emailsArray.map((email) => email.trim());
}
