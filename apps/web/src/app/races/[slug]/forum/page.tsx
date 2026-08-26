import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Post, PaginatedResponse } from '@/types';
import { PostCard } from '@/components/forum/PostCard';

async function getPosts(slug: string, page: number) {
  try {
    return await api.get<PaginatedResponse<Post & { _count: { comments: number } }>>(
      `/races/${slug}/posts?page=${page}&limit=20`,
    );
  } catch {
    return null;
  }
}

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function ForumPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page = '1' } = await searchParams;
  const result = await getPosts(slug, +page);

  if (!result) notFound();

  const { data: posts, meta } = result;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-zinc-500 text-sm mb-1">
            <Link href={`/races/${slug}`} className="hover:text-white transition">
              ← GP
            </Link>
            <span>/</span>
            <span>Fórum</span>
          </div>
          <h1 className="text-2xl font-bold">Fórum do Grande Prêmio</h1>
          <p className="text-zinc-400 text-sm mt-1">{meta.total} tópico(s)</p>
        </div>
        <Link
          href={`/races/${slug}/forum/new`}
          className="bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2 rounded-lg transition text-sm"
        >
          + Novo Tópico
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">
          <p className="text-4xl mb-4">💬</p>
          <p className="mb-4">Nenhum debate ainda. Seja o primeiro!</p>
          <Link
            href={`/races/${slug}/forum/new`}
            className="inline-block bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-2.5 rounded-lg transition"
          >
            Criar Tópico
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={{ ...post, race: { id: '', name: '', slug } }} />
            ))}
          </div>

          {/* Pagination */}
          {meta.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/races/${slug}/forum?page=${p}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    p === meta.page
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
