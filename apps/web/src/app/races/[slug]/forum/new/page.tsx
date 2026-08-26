'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PostForm } from '@/components/forum/PostForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function NewPostPage({ params }: Props) {
  const { slug } = use(params);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem('ss_token');
    if (!t) {
      router.push('/auth/login');
    } else {
      setToken(t);
    }
  }, [router]);

  if (!token) {
    return (
      <div className="text-center py-16 text-zinc-400">
        <p>Verificando autenticação...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href={`/races/${slug}/forum`}
          className="text-zinc-500 text-sm hover:text-white transition"
        >
          ← Voltar ao Fórum
        </Link>
        <h1 className="text-2xl font-bold mt-2">Novo Tópico</h1>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <PostForm raceSlug={slug} token={token} />
      </div>
    </div>
  );
}
