<template>
    <div class="result-view">
      <h1 class="title">Result View</h1>
      <h2 class="question">QUESTION</h2>
      <div v-for="(choice, index) in results" :key="index" class="result-container">
        <span>{{ choice.text }} -- {{ choice.votes }} vote/s</span>
      </div>
      <button @click="goToVote" class="vote-again-button">Vote again</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Dummy data: you can replace this with data from your backend/API
        results: [
          { text: "Choice 1", votes: 10 },
          { text: "Choice 2", votes: 5 },
          { text: "Choice 3", votes: 8 },
        ],
      };
    },
    methods: {
      goToVote() {
        // Navigate to the details page for voting again
        this.$router.push({ name: 'DetailsView' });
      },
    },
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
  