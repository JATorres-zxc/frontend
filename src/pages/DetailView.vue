<template>
  <div class="details-view">
    <h1 class="title">DETAILS VIEW</h1>
    <h2 class="question">{{ question.question_text }}</h2>

    <!-- Voting Form -->
    <form @submit.prevent="submitVote">
      <div v-for="(choice, index) in question.choices" :key="index" class="choice-container">
        <input 
          type="radio" 
          :value="choice.id" 
          v-model="selectedChoice" 
          :id="'choice-' + index" 
        />
        <label :for="'choice-' + index">{{ choice.choice_text }} </label>
        <!-- Edit and Delete buttons beside each choice -->
        <button @click.prevent="editChoice(choice.id)" class="edit-button">Edit</button>
        <button @click.prevent="deleteChoice(choice.id)" class="delete-button">Delete</button>
      </div>
      <button type="submit" class="vote-button">VOTE</button>
    </form>

    <!-- Add Choice Form -->
    <h3>Add a New Choice</h3>
    <form @submit.prevent="addChoice">
      <input
        v-model="newChoiceText"
        type="text"
        placeholder="Enter new choice text"
        required
      />
      <button type="submit">Add Choice</button>
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
      newChoiceText: '',  // New choice input
    };
  },
  methods: {
    getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '='))
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
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
        .then(response => response.json())
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

    addChoice() {
      const questionId = this.$route.params.id;
      const csrfToken = this.getCookie('csrftoken');

      fetch(`http://127.0.0.1:8000/polls/${questionId}/add_choice/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,  
        },
        body: JSON.stringify({
          choice_text: this.newChoiceText
        }),
      })
      .then(response => response.json())
      .then(data => {
        this.question.choices.push(data);  // Add new choice locally
        this.newChoiceText = '';  // Clear input field
      })
      .catch(error => {
        console.error('Error adding choice:', error);
      });
    },

    editChoice(choiceId) {
      const newChoiceText = prompt("Enter the new text for this choice:");
      if (newChoiceText) {
        const csrfToken = this.getCookie('csrftoken');

        fetch(`http://127.0.0.1:8000/polls/choice/${choiceId}/edit/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,  
          },
          body: JSON.stringify({
            choice_text: newChoiceText
          }),
        })
        .then(response => response.json())
        .then(data => {
          const choice = this.question.choices.find(c => c.id === choiceId);
          if (choice) {
            choice.choice_text = data.choice_text;  // Update choice text in UI
          }
        })
        .catch(error => {
          console.error('Error editing choice:', error);
        });
      }
    },

    deleteChoice(choiceId) {
      if (confirm("Are you sure you want to delete this choice?")) {
        const csrfToken = this.getCookie('csrftoken');

        fetch(`http://127.0.0.1:8000/polls/choice/${choiceId}/delete/`, {
          method: 'DELETE',
          headers: {
            'X-CSRFToken': csrfToken,  
          },
        })
        .then(response => {
          if (response.ok) {
            this.question.choices = this.question.choices.filter(c => c.id !== choiceId);
            alert('Choice deleted successfully!');
          } else {
            alert('Error deleting choice.');
          }
        })
        .catch(error => {
          console.error('Error deleting choice:', error);
        });
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
  