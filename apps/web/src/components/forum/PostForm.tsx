'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Post } from '@/types';

interface PostFormProps {
  raceSlug: string;
  token: string;
  existingPost?: Post;
  onSuccess?: () => void;
}

export function PostForm({ raceSlug, token, existingPost, onSuccess }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(existingPost?.title ?? '');
  const [body, setBody] = useState(existingPost?.body ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!existingPost;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing) {
        await api.patch(`/posts/${existingPost.id}`, { title, body }, token);
        onSuccess?.();
      } else {
        const post = await api.post<Post>(
          `/races/${raceSlug}/posts`,
          { title, body },
          token,
        );
        router.push(`/races/${raceSlug}/forum/${post.id}`);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar post');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-zinc-300 mb-1" htmlFor="title">
          Título
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          minLength={5}
          maxLength={120}
          placeholder="Título do tópico..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-1" htmlFor="body">
          Conteúdo
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          minLength={10}
          rows={6}
          placeholder="Escreva sua análise, opinião ou debate..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition resize-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition"
      >
        {loading
          ? 'Salvando...'
          : isEditing
          ? 'Salvar Alterações'
          : 'Publicar Tópico'}
      </button>
    </form>
  );
}
