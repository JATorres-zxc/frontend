<template>
    <div class="details-view">
      <h1 class="title">DETAILS VIEW</h1>
      <h2 class="question">QUESTION</h2>
      <form @submit.prevent="submitVote">
        <div v-for="(choice, index) in choices" :key="index" class="choice-container">
          <input 
            type="radio" 
            :value="choice" 
            v-model="selectedChoice" 
            :id="'choice-' + index" 
          />
          <label :for="'choice-' + index">{{ choice }}</label>
        </div>
        <button type="submit" class="vote-button">VOTE</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        choices: ["Choice 1", "Choice 2", "Choice 3"], // You can add as many choices as needed
        selectedChoice: null,  // Stores the user's selected choice
      };
    },
    methods: {
      submitVote() {
        if (this.selectedChoice) {
          // Here you can handle the submission logic, like sending the data to a backend API
          alert(`You voted for: ${this.selectedChoice}`);
        } else {
          alert("Please select a choice before voting.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .details-view {
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
  
  .choice-container {
    margin: 10px 0;
  }
  
  .vote-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  .vote-button:hover {
    background-color: #444;
  }
  </style>
  