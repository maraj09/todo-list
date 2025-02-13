import { useState } from "react";
import { usePage, router } from "@inertiajs/react";

export default function TodoList() {
    const { todos } = usePage().props; // Get todos from Inertia props
    const [newTitle, setNewTitle] = useState("");
    const [editTodo, setEditTodo] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    // Handle adding a new todo
    const handleAdd = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        router.post(
            "/todos",
            { title: newTitle },
            {
                onSuccess: () => setNewTitle(""), // Clear input after submission
            }
        );
    };

    // Handle updating a todo
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!editTitle.trim()) return;

        router.put(
            `/todos/${editTodo.id}`,
            { title: editTitle },
            {
                onSuccess: () => setEditTodo(null), // Exit edit mode
            }
        );
    };

    // Handle deleting a todo
    const handleDelete = (id) => {
        router.delete(`/todos/${id}`);
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>

            {/* Add Todo Form */}
            <form onSubmit={handleAdd} className="mb-4">
                <input
                    type="text"
                    className="border p-2 w-full"
                    placeholder="Enter a new todo..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 mt-2 w-full"
                >
                    Add Todo
                </button>
            </form>

            {/* Todo List */}
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex justify-between items-center border-b py-2"
                    >
                        {editTodo && editTodo.id === todo.id ? (
                            <form onSubmit={handleUpdate} className="flex-grow">
                                <input
                                    type="text"
                                    className="border p-2 w-full"
                                    value={editTitle}
                                    onChange={(e) =>
                                        setEditTitle(e.target.value)
                                    }
                                />
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-1 mt-1"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-400 text-white px-4 py-1 mt-1 ml-2"
                                    onClick={() => setEditTodo(null)}
                                >
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <>
                                <span className="flex-grow">{todo.title}</span>
                                <button
                                    className="bg-yellow-500 text-white px-3 py-1 mx-1"
                                    onClick={() => {
                                        setEditTodo(todo);
                                        setEditTitle(todo.title);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1"
                                    onClick={() => handleDelete(todo.id)}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
