// src/utils/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Bu fonksiyon, sunucu tarafında (Server Components, Route Handlers, Server Actions)
// çalışacak tam bir Supabase istemcisi oluşturur.
export const createClient = () => {
  // next/headers'dan cookie deposunu alıyoruz.
  const cookieStore = cookies()

  // @supabase/ssr'dan gelen createServerClient fonksiyonunu kullanarak istemciyi oluşturuyoruz.
  // Bu fonksiyon, veritabanı (.from()), kimlik doğrulama (.auth) ve diğer tüm
  // Supabase özelliklerini içeren tam bir nesne döndürür.
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Sunucu Bileşenleri ve Route Handler'lar set metodunu çağırabilir,
            // ancak Server Action'lar çağıramaz. Hata oluşursa görmezden geliyoruz.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Yukarıdakiyle aynı durum.
          }
        },
      },
    }
  )
}