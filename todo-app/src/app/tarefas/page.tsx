"use client"

import { useEffect, useState } from "react"
import axios from "axios"

interface Tarefa {
  id: number
  todo: string
  completed: boolean
  userId: number
}

export default function TarefasPage() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/todos")
        setTarefas(response.data.todos)
      } catch (err) {
        console.error(err)
        setError("Erro ao carregar tarefas")
      } finally {
        setLoading(false)
      }
    }

    fetchTarefas()
  }, [])

  if (loading) return <p className="p-4">Carregando tarefas...</p>
  if (error) return <p className="p-4 text-red-500">{error}</p>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Tarefas</h1>
      <ul className="space-y-2">
        {tarefas.map(tarefa => (
          <li key={tarefa.id} className="bg-white p-4 rounded shadow">
            <input type="checkbox" checked={tarefa.completed} readOnly className="mr-2" />
            {tarefa.todo}
          </li>
        ))}
      </ul>
    </div>
  )
}
