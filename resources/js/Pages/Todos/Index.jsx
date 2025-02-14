import { useEffect, useState } from "react";
import { usePage, router, Head } from "@inertiajs/react";
import Echo from 'laravel-echo';

export default function TodoList() {
    const { todos: initialTodos } = usePage().props;
    const [todos, setTodos] = useState(initialTodos);
    const { flash } = usePage().props;
    const [newTitle, setNewTitle] = useState("");
    const [editTodo, setEditTodo] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    useEffect(() => {

        window.Echo.channel('todos').listen('TodoUpdated', (event) => {
            setTodos(event.todos);
        });

    }, []);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        router.post(
            "/todos",
            { title: newTitle },
            {
                onSuccess: () => setNewTitle(""),
            }
        );
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!editTitle.trim()) return;

        router.put(
            `/todos/${editTodo.id}`,
            { title: editTitle },
            {
                onSuccess: () => setEditTodo(null),
            }
        );
    };

    const handleDelete = (id) => {
        router.delete(`/todos/${id}`);
    };

    return (
        <>
            <Head title="Todo List" />
            <div className="max-w-lg mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                {flash?.success && (
                    <div className="bg-green-500 text-white p-2 rounded-md mb-4">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-500 text-white p-2 rounded-md mb-4">
                        {flash.error}
                    </div>
                )}
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
                                <form
                                    onSubmit={handleUpdate}
                                    className="flex-grow"
                                >
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
                                    <span className="flex-grow">
                                        {todo.title}
                                    </span>
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
        </>
    );
}
