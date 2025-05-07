import { useEffect, useState } from 'react';

export default function Meltview() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetch(`${apiBase}/media`)
      .then(res => res.json())
      .then(setMedia)
      .catch(err => console.error("Failed to load media:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Meltview Library</h2>
      <ul className="space-y-4">
        {media.map(item => (
          <li key={item.id} className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">
              Type: {item.type} | Rating: {item.rating}/10
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
