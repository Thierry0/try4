<template>
    <div>
        <q-select v-model="selectedExam" :options="examOptions" label="Select Exam" outlined />
        <q-input v-model="openAI_API_Key" label="OpenAI API Key" outlined type="password" />

        <q-btn @click="getNewQuestion" label="Get New Question" color="primary" />
        <h3>Topics Dashboard</h3>
        <q-input v-model="newTopic" label="Add New Topic" outlined />
        <q-btn @click="addTopic" label="Add Topic" color="primary" />
        <q-list>
            <q-item v-for="topic in topics" :key="topic.id">
                <q-item-section>{{ topic.topic }} (Practiced: {{ topic.practicedCount }} | Correct Count: {{ topic.correctAnswers }})</q-item-section>
                <q-item-section side>
                    <q-btn @click="deleteTopic(topic.id)" color="negative" icon="delete" />
                </q-item-section>
            </q-item>
        </q-list>

        
        <div v-if="question">
            <div class="question-text">{{ question }}</div>
            <q-input v-model="answer" label="Your Answer" outlined type="textarea" autogrow />
            <q-btn @click="submitAnswer" label="Submit Answer" color="secondary" />
        </div>
        <div v-if="feedback">
            <h3>Feedback:</h3>
            <div class="feedback-text">{{ feedback }}</div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { API, graphqlOperation } from 'aws-amplify';
import {
    listTopicProgresses,
    listUserProgresses,
} from '@/graphql/queries';
import {
    createTopicProgress as createTopicProgressMutation,
    updateTopicProgress as updateTopicProgressMutation,
    updateUserProgress as updateUserProgressMutation,
} from '@/graphql/mutations'
import {
    deleteTopicProgress as deleteTopicProgressMutation,
} from '@/graphql/mutations';



export default {
    data() {
        return {
            selectedExam: null,
            openAI_API_Key: '',
            examOptions: [
                {
                    label: 'FCFE',
                    value: 'Foundations of Corporate Finance and ERM (FCFE) Exam',
                },
                { label: 'ERM', value: 'Enterprise Risk Management (ERM) Exam' },
            ],
            question: null,
            answer: '',
            feedback: null,
            topics: [],
            newTopic: '',
            currentTopic: null,
        };
    },
    methods: {
        async getNewQuestion() {
            // Find the minimum practiced count among all topics
            const minPracticedCount = Math.min(...this.topics.map(topic => topic.practicedCount));

            // Filter the topics that have the minimum practiced count
            const leastPracticedTopics = this.topics.filter(topic => topic.practicedCount === minPracticedCount);

            // Get a random topic from the least practiced topics
            const randomIndex = Math.floor(Math.random() * leastPracticedTopics.length);
            const topic = leastPracticedTopics[randomIndex].topic;

            this.currentTopic = topic;

            const examName = this.selectedExam;
            const prompt = `I am preparing for the ${examName} offered by the society of actuaries. To help me prepare for the exam, give me one ${topic} related question that can show up on the exam. You can match it with other topics you know are on the ${examName} to create a more complete question.`;

            const response = await this.sendRequestToOpenAI(prompt, 0.6);

            console.log(response.choices[0].message.content)
            this.question = response.choices[0].message.content;
        },

        async submitAnswer() {
            const ExamName = this.selectedExam;
            const prompt = `I'm preparing for the Society of Actuaries ${ExamName} and need your help. I have answered the following question: '${this.question}'. Please evaluate my knowledge by providing feedback on my answer and refer to the grading scheme used in past SOA exams to determine the credit I would receive (none, small, significant, full). Please provide an explanation for the correctness of my answer. These answers will be programmatically parsed, can you make sure your feedback contains the following codes based on credit assigned? For none or small credits, your reply should include 'IncorrectFOSHO' and significant or full credit, your reply should include 'CorrectDUDE'. Thank you! Here is my answer: ${this.answer}.`;

            const response = await this.sendRequestToOpenAI(prompt, 0.3);

            this.feedback = response.choices[0].message.content;

            // Update user progress and correct answers based on feedback
            if (this.feedback.includes('CorrectDUDE')) {
                // Find the topic object in the topics array
                const topicIndex = this.topics.findIndex(t => t.topic === this.currentTopic);

                // Update the practiced count and correct answer count for the topic
                this.topics[topicIndex].practicedCount++;
                this.topics[topicIndex].correctAnswers++;

                // Update the topic progress in the backend
                await this.updateTopic(this.topics[topicIndex].id, this.topics[topicIndex].practicedCount, this.topics[topicIndex].correctAnswers);
            }
            if (this.feedback.includes('IncorrectFOSHO')) {
                // Find the topic object in the topics array
                const topicIndex = this.topics.findIndex(t => t.topic === this.currentTopic);

                // Update the practiced count for the topic
                this.topics[topicIndex].practicedCount++;

                // Update the topic progress in the backend
                await this.updateTopic(this.topics[topicIndex].id, this.topics[topicIndex].practicedCount, this.topics[topicIndex].correctAnswers);
            }
        },

        async sendRequestToOpenAI(prompt, temperature) {
            if (!this.openAI_API_Key) {
                alert("Please enter your OpenAI API Key.");
                return;
            }
            const url = 'https://api.openai.com/v1/chat/completions';

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.openAI_API_Key,
            };

            const data = {
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 500,
                model: 'gpt-3.5-turbo',
                temperature: temperature,
            };

            try {
                const response = await axios.post(url, data, { headers });
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchAllTopics() {
            try {
                const response = await API.graphql(
                    graphqlOperation(listTopicProgresses)
                );
                const topics = response.data.listTopicProgresses.items;
                return topics;
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        },
        async createNewTopic(topic, examName) {
            const topicData = {
                topic: topic,
                practicedCount: 0,
                correctAnswers: 0,
                examName: examName,
            };

            try {
                await API.graphql(
                    graphqlOperation(createTopicProgressMutation, {
                        input: topicData,
                    })
                );
            } catch (error) {
                console.error('Error creating new topic:', error);
            }
        },
        async updateTopic(topicId, practicedCount, correctAnswers) {
            try {
                await API.graphql(
                    graphqlOperation(updateTopicProgressMutation, {
                        input: {
                            id: topicId,
                            practicedCount: practicedCount,
                            correctAnswers: correctAnswers,
                        },
                    })
                );
            } catch (error) {
                console.error('Error updating topic:', error);
            }
        },
        async fetchUserProgress(examName) {
            try {
                const response = await API.graphql(
                    graphqlOperation(listUserProgresses, {
                        filter: {
                            examName: {
                                eq: examName,
                            },
                        },
                    })
                );
                const userProgress = response.data.listUserProgresses.items[0];
                return userProgress;
            } catch (error) {
                console.error('Error fetching user progress:', error);
            }
        },
        async updateUserProgress(userProgressId, updatedFields) {
            try {
                await API.graphql(
                    graphqlOperation(updateUserProgressMutation, {
                        input: {
                            id: userProgressId,
                            ...updatedFields,
                        },
                    })
                );
            } catch (error) {
                console.error('Error updating user progress:', error);
            }
        },
        async addTopic() {
            if (this.newTopic === '') {
                alert('Please enter a topic name.');
                return;
            }
            await this.createNewTopic(this.newTopic, this.selectedExam);
            this.newTopic = '';
            this.topics = await this.fetchAllTopics();
        },
        async deleteTopic(topicId) {
            try {
                await API.graphql(
                    graphqlOperation(deleteTopicProgressMutation, { input: { id: topicId } })
                );
                this.topics = await this.fetchAllTopics();
            } catch (error) {
                console.error('Error deleting topic:', error);
            }
        },


    },

    async mounted() {
        if (this.selectedExam === null) {
            this.selectedExam = this.examOptions[0].value;
        }
        this.topics = await this.fetchAllTopics();
    },
};
</script>

  