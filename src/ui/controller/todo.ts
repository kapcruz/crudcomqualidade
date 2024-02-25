async function get() {
  return fetch("/api/todos").then(async (respostaDoServidor) => {
    const todosString = await respostaDoServidor.text();
    const todosDoServidor = JSON.parse(todosString).todos;
    return todosDoServidor;
  });
}

export const todoController = {
  get,
};
