'use client';

import { useState, useEffect } from 'react';
import { Comment, User } from '@/types';
import { api } from '@/lib/api';

interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
  raceSlug: string;
}

function getUser(): User | null {
  try {
    const raw = localStorage.getItem('ss_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getToken(): string | null {
  return localStorage.getItem('ss_token');
}

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState('');

  useEffect(() => {
    setUser(getUser());
    setToken(getToken());
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const newComment = await api.post<Comment>(`/posts/${postId}/comments`, { body }, token);
      setComments((prev) => [...prev, newComment]);
      setBody('');
    } catch (err: any) {
      setError(err.message || 'Erro ao comentar');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(commentId: string) {
    if (!token || !confirm('Deletar este comentário?')) return;
    try {
      await api.delete(`/comments/${commentId}`, token);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err: any) {
      alert(err.message || 'Erro ao deletar');
    }
  }

  async function handleEdit(commentId: string) {
    if (!token) return;
    setLoading(true);
    try {
      const updated = await api.patch<Comment>(`/comments/${commentId}`, { body: editBody }, token);
      setComments((prev) => prev.map((c) => (c.id === commentId ? updated : c)));
      setEditingId(null);
      setEditBody('');
    } catch (err: any) {
      alert(err.message || 'Erro ao editar');
    } finally {
      setLoading(false);
    }
  }

  const canEditOrDelete = (authorId: string) =>
    user?.id === authorId || user?.role === 'ADMIN';

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">
        💬 Comentários ({comments.length})
      </h2>

      {/* Comment list */}
      <div className="space-y-3 mb-6">
        {comments.length === 0 && (
          <p className="text-zinc-500 text-sm text-center py-8">
            Nenhum comentário ainda. Seja o primeiro!
          </p>
        )}
        {comments.map((comment) => {
          const isEditing = editingId === comment.id;
          const date = new Date(comment.createdAt).toLocaleString('pt-BR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={comment.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-bold uppercase">
                    {comment.author.username[0]}
                  </div>
                  <span className="text-zinc-300 text-sm font-medium">{comment.author.username}</span>
                  <span className="text-zinc-600 text-xs font-mono">{date}</span>
                </div>
                {canEditOrDelete(comment.author.id) && !isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditingId(comment.id); setEditBody(comment.body); }}
                      className="text-xs text-zinc-400 hover:text-white transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-xs text-red-500 hover:text-red-400 transition"
                    >
                      Deletar
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    rows={3}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500 transition resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(comment.id)}
                      disabled={loading}
                      className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-xs text-zinc-400 hover:text-white transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-zinc-300 text-sm leading-relaxed">{comment.body}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* New comment form */}
      {user && token ? (
        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
          <p className="text-sm text-zinc-400">
            Comentando como <span className="text-white font-medium">{user.username}</span>
          </p>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            minLength={2}
            rows={3}
            placeholder="Escreva seu comentário..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition resize-none text-sm"
          />
          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg transition text-sm"
          >
            {loading ? 'Enviando...' : 'Comentar'}
          </button>
        </form>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
          <p className="text-zinc-400 text-sm mb-3">Faça login para comentar</p>
          <a
            href="/auth/login"
            className="inline-block bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2 rounded-lg transition text-sm"
          >
            Entrar
          </a>
        </div>
      )}
    </section>
  );
}
