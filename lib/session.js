import { cookies } from 'next/headers';

export function getSession() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session'); // Get the session cookie

  return sessionCookie ? JSON.parse(sessionCookie.value) : null;
}