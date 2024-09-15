<template>
  <div class="result-view">
    <h1 class="title">Result View</h1>
    <h2 class="question">{{ question.question_text }}</h2>
    <div v-for="(choice, index) in question.choices" :key="index" class="result-container">
      <span>{{ choice.choice_text }} -- {{ choice.votes }} vote/s</span>
    </div>
    <button @click="goToVote" class="vote-again-button">Vote again</button>
    <br>
    <br>
    <br>
    <button @click="goBackToIndex" class="vote-button">Go back to question list</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: {
        question_text: '',
        choices: [],
      },  
    };
  },
  methods: {
    fetchResults() {
      const questionId = this.$route.params.id;
      fetch(`http://127.0.0.1:8000/api-sileo/question/question/get/${questionId}/`)
        .then(response => response.json())
        .then(data => {
          this.question = data.data;
        })
        .catch(error => {
          console.error('Error fetching question:', error);
        });
    },
    goToVote() {
  
      const questionId = this.$route.params.id;
      this.$router.push({ name: 'DetailsView', params: { id: questionId } });
    },
    goBackToIndex() {
      this.$router.push({ name: 'IndexView' });
    }
  },
  created() {
    this.fetchResults();
  }
};
</script>

  
  <style scoped>
  .result-view {
    text-align: center;
    margin-top: 50px;
  }
  
  .title {
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .question {
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .result-container {
    margin: 10px 0;
    font-size: 18px;
  }
  
  .vote-again-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  .vote-again-button:hover {
    background-color: #444;
  }
  </style>
  