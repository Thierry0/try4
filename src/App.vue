<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <q-layout view="lHh Lpr lFf">
        <q-header elevated class="glossy">
          <q-toolbar>
            <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu" />

            <q-toolbar-title>
              TM App
            </q-toolbar-title>

            <div><button @click="signOut">Sign Out</button></div>
          </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
          <!-- <q-list>
            <q-item-label header>Progress Stats</q-item-label>
            <q-item>
              <q-item-section>
                <q-item-label>Daily Streak:</q-item-label>
                <q-item-label>{{ userProgress.dailyStreak }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Longest Daily Streak:</q-item-label>
                <q-item-label>{{ userProgress.longestDailyStreak }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Correct Response Streak:</q-item-label>
                <q-item-label>{{ userProgress.correctResponseStreak }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Longest Correct Response Streak:</q-item-label>
                <q-item-label>{{ userProgress.longestCorrectResponseStreak }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item-label header>Essential Links</q-item-label>
          </q-list> -->
        </q-drawer>

        <q-page-container>
          <p>Hello {{ user.signInUserSession.idToken.payload.email.split("@")[0] }}!</p>

          <main-component />
        </q-page-container>
      </q-layout>
    </template>
  </authenticator>
</template>

<script>
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

import { API, graphqlOperation } from 'aws-amplify';
import { listUserProgresses } from './graphql/queries';
import MainComponent from './components/MainComponent.vue';

export default {
  name: 'LayoutDefault',

  components: {
    MainComponent,
    Authenticator
  },

  data() {
    return {
      leftDrawerOpen: false,
      userProgress: {},
    };
  },

  async created() {
    try {
      //const userData = await API.graphql(graphqlOperation(getUserProgress));
      //this.userProgress = userData.data.getUserProgress;
      const { data } = await API.graphql(graphqlOperation(listUserProgresses));
      this.userProgress = data.listUserProgresses.items[0];
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  },
};
</script>

