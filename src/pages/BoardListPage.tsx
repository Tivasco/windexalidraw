import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardList from '../components/excalidraw/BoardList';

const BoardListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Excalidraw Boards</h1>
        <button
          onClick={() => navigate('/excalidraw/new')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          New Board
        </button>
      </div>
      <BoardList />
    </div>
  );
};

export default BoardListPage;
