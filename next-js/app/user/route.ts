import { redirect, RedirectType } from 'next/navigation'

export async function GET() {
  return redirect('user/my_objects', RedirectType.push)
}
