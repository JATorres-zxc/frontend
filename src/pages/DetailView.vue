<template>
  <div class="details-view">
    <h1 class="title">DETAILS VIEW</h1>
    <h2 class="question">{{ question.question_text }}</h2>
    <form @submit.prevent="submitVote">
      <div v-for="(choice, index) in question.choices" :key="index" class="choice-container">
        <input 
          type="radio" 
          :value="choice.id" 
          v-model="selectedChoice" 
          :id="'choice-' + index" 
        />
        <label :for="'choice-' + index">{{ choice.choice_text }}</label>
      </div>
      <button type="submit" class="vote-button">VOTE</button>
    </form>
    <br>
    <button @click="goBackToIndex" class="vote-button">Go back to question list</button>
    <br>
    <button @click="goToResult" class="vote-button">View Results of this Question</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: {},  
      selectedChoice: null,  
    };
  },
  methods: {
    getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    },

    fetchQuestion() {
      const questionId = this.$route.params.id;
      fetch(`http://127.0.0.1:8000/polls/${questionId}/`)
        .then(response => response.json())
        .then(data => {
          this.question = data;
        })
        .catch(error => {
          console.error('Error fetching question:', error);
        });
    },

    submitVote() {
      const questionId = this.$route.params.id;
      const csrfToken = this.getCookie('csrftoken');

      console.log('CSRF Token:', csrfToken);
      console.log({
        choice: this.selectedChoice
      });

      if (this.selectedChoice) {
        fetch(`http://127.0.0.1:8000/polls/${questionId}/vote/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,  
          },
          body: JSON.stringify({
            choice: this.selectedChoice  
          }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          if (data.error) {
            alert(data.error);  
          } else {
            alert('Vote successfully recorded!');
            this.$router.push({ name: 'ResultsView', params: { id: questionId } });
          }
        })
        .catch(error => {
          console.error('Error submitting vote:', error);
        });
      } else {
        alert("Please select a choice before voting.");
      }
    },

    goBackToIndex() {
      this.$router.push({ name: 'IndexView' });
    },
    goToResult(){
      this.$router.push({ name: 'ResultsView' });
    }
  },
  created() {
    this.fetchQuestion();
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
  