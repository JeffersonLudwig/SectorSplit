'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import { api } from '@/lib/api';
import { Toast } from '@/components/ui/Toast';

interface PostActionsProps {
  postId: string;
  authorId: string;
  initialTitle: string;
  initialBody: string;
  raceSlug: string;
}

export function PostActions({ postId, authorId, initialTitle, initialBody, raceSlug }: PostActionsProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ss_user');
      setUser(raw ? JSON.parse(raw) : null);
      setToken(localStorage.getItem('ss_token'));
    } catch { /* ignore */ }
  }, []);

  const canActOnPost = user?.id === authorId || user?.role === 'ADMIN';
  if (!canActOnPost) return null;

  async function handleDelete() {
    if (!token || !confirm('Tem certeza que deseja deletar este tópico? Esta ação é irreversível.')) return;
    setLoading(true);
    try {
      await api.delete(`/posts/${postId}`, token);
      router.push(`/races/${raceSlug}/forum`);
      router.refresh();
    } catch (err: any) {
      setToast({ message: err.message || 'Erro ao deletar post', type: 'error' });
      setLoading(false);
    }
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      await api.patch(`/posts/${postId}`, { title, body }, token);
      setToast({ message: 'Tópico atualizado!', type: 'success' });
      setEditing(false);
      router.refresh();
    } catch (err: any) {
      setToast({ message: err.message || 'Erro ao editar', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  if (editing) {
    return (
      <>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <form onSubmit={handleEdit} className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 space-y-4 mt-4">
          <h3 className="text-white font-semibold">Editar tópico</h3>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500 transition"
            placeholder="Título"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={5}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500 transition resize-none"
            placeholder="Conteúdo"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg transition text-sm"
            >
              {loading ? 'Salvando...' : 'Salvar alterações'}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-sm text-zinc-400 hover:text-white transition px-4 py-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setEditing(true)}
          className="text-xs text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg transition"
        >
          ✏️ Editar tópico
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs text-red-400 hover:text-white bg-zinc-800 hover:bg-red-600 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
        >
          🗑️ Deletar tópico
        </button>
      </div>
    </>
  );
}
