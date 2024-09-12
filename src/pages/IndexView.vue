<template>
  <div>
    <h1 class="title">INDEX VIEW</h1>
    <div class="questions-container">
      <div 
        class="question-item" 
        v-for="(question, index) in questions" 
        :key="index"
      >
        <span class="question-title">{{ question.question_text }}</span>
        <span class="pub-date">{{ formatDate(question.pub_date) }}</span>
        <a 
          :href="`/details/${question.id}`" 
          class="link"
        >
          GO TO THIS QUESTION
        </a>
        <button @click="editQuestion(question.id)" class="edit-button">
          Edit
        </button>
        <button @click="deleteQuestion(question.id)" class="delete-button">
          Delete
        </button>
      </div>
    </div>

    <br>
    <br>

    <div>
      <h2>Create Question</h2>
      <form @submit.prevent="createQuestion">
        <div>
          <label for="questionText">Question:</label>
          <input
            v-model="newQuestion.question_text"
            type="text"
            id="questionText"
            required
          />
        </div>
        <br>
        <button type="submit">Create Question</button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      questions: [], 
      newQuestion: {
        question_text: '',  
      },
    };
  },
  methods: {
    fetchQuestions() {
      fetch('http://127.0.0.1:8000/polls/') 
        .then((response) => response.json())
        .then((data) => {
          this.questions = data;
        })
        .catch((error) => {
          console.error('Error fetching questions:', error);
        });
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    createQuestion() {
      fetch('http://127.0.0.1:8000/polls/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newQuestion),
      })
      .then((response) => response.json())
      .then((data) => {
        this.questions.push(data);  
        this.newQuestion.question_text = '';  
      })
      .catch((error) => {
        console.error('Error creating question:', error);
      });
    },
    editQuestion(questionId) {
      const newQuestionText = prompt("Enter the new question text:");
      if (newQuestionText) {
        fetch(`http://127.0.0.1:8000/polls/${questionId}/edit/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question_text: newQuestionText
          })
        })
        .then(response => response.json())
        .then(() => {
          alert('Question updated successfully!');
          this.fetchQuestions();  
        })
        .catch(error => {
          console.error('Error updating question:', error);
        });
      }
    },
    deleteQuestion(questionId) {
      if (confirm("Are you sure you want to delete this question?")) {
        fetch(`http://127.0.0.1:8000/polls/${questionId}/delete/`, {
          method: 'DELETE',
        })
        .then(() => {
          alert('Question deleted successfully!');
          this.fetchQuestions();  
        })
        .catch(error => {
          console.error('Error deleting question:', error);
        });
      }
    },
  },
  created() {
    this.fetchQuestions();
  },
};
</script>


<style scoped>
.title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}

.questions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.question-item {
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 10px 0;
}

.question-title, .pub-date, .link {
  flex: 1;
  text-align: center;
}

.question-title {
  font-weight: bold;
}

.link {
  text-decoration: none;
  font-weight: bold;
}
</style>
