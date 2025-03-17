import React, { useState, useEffect } from 'react';
import { apiClient } from '../../services/api/apiClient';
import { Link } from 'react-router-dom';

interface Board {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

const BoardList: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await apiClient.get<Board[]>('/api/excalidraw/boards');
        setBoards(response);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch boards');
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this board?')) {
      return;
    }

    try {
      await apiClient.delete(`/api/excalidraw/boards/${id}`);
      setBoards(boards.filter(board => board.id !== id));
    } catch (err) {
      setError('Failed to delete board');
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (boards.length === 0) {
    return <div className="text-gray-500">No boards yet. Create your first board!</div>;
  }

  return (
    <div className="space-y-4">
      {boards.map((board) => (
        <div key={board.id} className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center">
            <div>
              <Link to={`/excalidraw/${board.id}`} className="text-lg font-semibold hover:text-blue-600">
                {board.title}
              </Link>
              <div className="text-sm text-gray-500">
                Last updated: {new Date(board.updated_at).toLocaleDateString()}
              </div>
            </div>
            <button
              onClick={() => handleDelete(board.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardList;
