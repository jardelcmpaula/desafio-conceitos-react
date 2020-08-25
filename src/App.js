import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([])
  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `React Etc E Tal ${Date.now()}`,
      owner: "Jarde Costa",
      techs: [
        "React", "JavaScript", "PHP"
      ]
    })
    const repository = [...repositories, response.data]
    setRepositories(repository)
  }

  async function handleRemoveRepository(id) {
    // TODO

    await api.delete(`repositories/${id}`)

    const repoIndex = repositories.findIndex(repo => repo.id === id)
    repositories.splice(repoIndex, 1)
    setRepositories([...repositories])
  }
  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data)
      })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
                </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
