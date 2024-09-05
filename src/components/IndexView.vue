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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [], // Array to hold the questions from the API
    };
  },
  methods: {
    fetchQuestions() {
      // Make an API call to fetch the questions
      fetch('http://127.0.0.1:8000/polls/') // Replace with your API endpoint
        .then((response) => response.json())
        .then((data) => {
          this.questions = data;
        })
        .catch((error) => {
          console.error('Error fetching questions:', error);
        });
    },
    formatDate(dateString) {
      // Format the publication date
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
  created() {
    // Fetch questions when the component is created
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
