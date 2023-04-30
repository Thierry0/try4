/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTopicProgress = /* GraphQL */ `
  subscription OnCreateTopicProgress(
    $filter: ModelSubscriptionTopicProgressFilterInput
    $owner: String
  ) {
    onCreateTopicProgress(filter: $filter, owner: $owner) {
      id
      topic
      practicedCount
      correctAnswers
      examName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateTopicProgress = /* GraphQL */ `
  subscription OnUpdateTopicProgress(
    $filter: ModelSubscriptionTopicProgressFilterInput
    $owner: String
  ) {
    onUpdateTopicProgress(filter: $filter, owner: $owner) {
      id
      topic
      practicedCount
      correctAnswers
      examName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteTopicProgress = /* GraphQL */ `
  subscription OnDeleteTopicProgress(
    $filter: ModelSubscriptionTopicProgressFilterInput
    $owner: String
  ) {
    onDeleteTopicProgress(filter: $filter, owner: $owner) {
      id
      topic
      practicedCount
      correctAnswers
      examName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateUserProgress = /* GraphQL */ `
  subscription OnCreateUserProgress(
    $filter: ModelSubscriptionUserProgressFilterInput
    $owner: String
  ) {
    onCreateUserProgress(filter: $filter, owner: $owner) {
      id
      dailyStreak
      longestDailyStreak
      mostCorrectResponsesPerDay
      correctResponseStreak
      longestCorrectResponseStreak
      examName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUserProgress = /* GraphQL */ `
  subscription OnUpdateUserProgress(
    $filter: ModelSubscriptionUserProgressFilterInput
    $owner: String
  ) {
    onUpdateUserProgress(filter: $filter, owner: $owner) {
      id
      dailyStreak
      longestDailyStreak
      mostCorrectResponsesPerDay
      correctResponseStreak
      longestCorrectResponseStreak
      examName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUserProgress = /* GraphQL */ `
  subscription OnDeleteUserProgress(
    $filter: ModelSubscriptionUserProgressFilterInput
    $owner: String
  ) {
    onDeleteUserProgress(filter: $filter, owner: $owner) {
      id
      dailyStreak
      longestDailyStreak
      mostCorrectResponsesPerDay
      correctResponseStreak
      longestCorrectResponseStreak
      examName
      createdAt
      updatedAt
      owner
    }
  }
`;
