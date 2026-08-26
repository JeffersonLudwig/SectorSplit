import Link from 'next/link';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const date = new Date(post.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link href={`/races/${post.race?.slug}/forum/${post.id}`}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 hover:border-red-500 transition-all duration-200 cursor-pointer">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold uppercase">
            {post.author.username[0]}
          </div>
          <span className="text-zinc-400 text-xs">{post.author.username}</span>
          <span className="text-zinc-600 text-xs">·</span>
          <span className="text-zinc-500 text-xs font-mono">{date}</span>
          {post.pinned && (
            <span className="ml-auto text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">
              📌 Fixado
            </span>
          )}
        </div>

        <h3 className="text-white font-semibold text-sm leading-snug mb-2 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-zinc-400 text-xs line-clamp-2 mb-3">{post.body}</p>

        <div className="flex items-center gap-4 text-zinc-500 text-xs">
          <span>💬 {post._count?.comments ?? 0} comentário(s)</span>
        </div>
      </div>
    </Link>
  );
}
