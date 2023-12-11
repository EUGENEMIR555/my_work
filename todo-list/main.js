const todoItem = {
    props: ["todo"],
    methods: {
      removeItem() {
        this.$emit("remove", this.todo);
      },
    },
    template: `
      <div class="item" :data-id="todo.id">
          <input type="checkbox" :checked="todo.completed" :key="todo.id">{{ todo.title }}
          <span class="delete" @click="removeItem">&times;</span>
      </div>
    `,
  };
  
  const app = Vue.createApp({
    data() {
      return {
        todoList: [],
        newItem: "",
      };
    },
    methods: {
      addItem() {
        let cnt = this.todoList.length + 1;
        this.todoList.unshift({ title: this.newItem, id: cnt, completed: false });
        this.newItem = "";
      },
      removeItem(todo) {
        const index = this.todoList.findIndex((item) => item.id === todo.id);
        if (index !== -1) {
          this.todoList.splice(index, 1);
        } else {
          console.error("Элемент не найден");
        }
      },
    },
    components: {
      "todo-item": todoItem,
    },
    mounted() {
      fetch("https://jsonplaceholder.typicode.com/todos/")
        .then((response) => response.json())
        .then((json) => (this.todoList = json));
    },
  });
  
  app.mount("#todo");
  