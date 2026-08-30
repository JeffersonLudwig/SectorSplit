import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Post, Comment } from '@/types';
import { CommentSection } from '@/components/forum/CommentSection';
import { PostActions } from '@/components/forum/PostActions';

type PostDetail = Post & { _count: { comments: number } };

async function getPost(id: string): Promise<PostDetail | null> {
  try { return await api.get<PostDetail>(`/posts/${id}`); }
  catch { return null; }
}

async function getComments(id: string): Promise<Comment[]> {
  try { return await api.get<Comment[]>(`/posts/${id}/comments`); }
  catch { return []; }
}

interface Props {
  params: Promise<{ slug: string; id: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug, id } = await params;
  const [post, comments] = await Promise.all([getPost(id), getComments(id)]);

  if (!post) notFound();

  const postDate = new Date(post.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-zinc-500 text-sm">
        <Link href={`/races/${slug}`} className="hover:text-white transition">GP</Link>
        <span>/</span>
        <Link href={`/races/${slug}/forum`} className="hover:text-white transition">Fórum</Link>
        <span>/</span>
        <span className="text-zinc-300 truncate max-w-[200px]">{post.title}</span>
      </div>

      {/* Post */}
      <article className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold uppercase text-sm flex-shrink-0">
              {post.author.username[0]}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{post.author.username}</p>
              <p className="text-zinc-500 text-xs font-mono">{postDate}</p>
            </div>
          </div>
          {post.pinned && (
            <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full flex-shrink-0">
              📌 Fixado
            </span>
          )}
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">{post.title}</h1>
        <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{post.body}</div>

        {/* Edit/Delete buttons (only for author/admin — client component) */}
        <PostActions
          postId={post.id}
          authorId={post.author.id}
          initialTitle={post.title}
          initialBody={post.body}
          raceSlug={slug}
        />
      </article>

      {/* Comments */}
      <CommentSection postId={id} initialComments={comments} raceSlug={slug} />
    </div>
  );
}
