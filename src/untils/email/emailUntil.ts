function extractUsernameFromEmail(email: string): string {
  const atIndex = email.indexOf('@');

  if (atIndex === -1) {
    return email;
  }

  const username = email.substring(0, atIndex);

  return username;
}

export {
  extractUsernameFromEmail
}
