// app/page.tsx  (server component by default)
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/list'); // sends all visits at "/" to /list
}
