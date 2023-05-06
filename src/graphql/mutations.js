/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTopicProgress = /* GraphQL */ `
  mutation CreateTopicProgress(
    $input: CreateTopicProgressInput!
    $condition: ModelTopicProgressConditionInput
  ) {
    createTopicProgress(input: $input, condition: $condition) {
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
export const updateTopicProgress = /* GraphQL */ `
  mutation UpdateTopicProgress(
    $input: UpdateTopicProgressInput!
    $condition: ModelTopicProgressConditionInput
  ) {
    updateTopicProgress(input: $input, condition: $condition) {
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
export const deleteTopicProgress = /* GraphQL */ `
  mutation DeleteTopicProgress(
    $input: DeleteTopicProgressInput!
    $condition: ModelTopicProgressConditionInput
  ) {
    deleteTopicProgress(input: $input, condition: $condition) {
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
export const createUserProgress = /* GraphQL */ `
  mutation CreateUserProgress(
    $input: CreateUserProgressInput!
    $condition: ModelUserProgressConditionInput
  ) {
    createUserProgress(input: $input, condition: $condition) {
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
export const updateUserProgress = /* GraphQL */ `
  mutation UpdateUserProgress(
    $input: UpdateUserProgressInput!
    $condition: ModelUserProgressConditionInput
  ) {
    updateUserProgress(input: $input, condition: $condition) {
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
export const deleteUserProgress = /* GraphQL */ `
  mutation DeleteUserProgress(
    $input: DeleteUserProgressInput!
    $condition: ModelUserProgressConditionInput
  ) {
    deleteUserProgress(input: $input, condition: $condition) {
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
export const createKey = /* GraphQL */ `
  mutation CreateKey(
    $input: CreateKeyInput!
    $condition: ModelKeyConditionInput
  ) {
    createKey(input: $input, condition: $condition) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateKey = /* GraphQL */ `
  mutation UpdateKey(
    $input: UpdateKeyInput!
    $condition: ModelKeyConditionInput
  ) {
    updateKey(input: $input, condition: $condition) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteKey = /* GraphQL */ `
  mutation DeleteKey(
    $input: DeleteKeyInput!
    $condition: ModelKeyConditionInput
  ) {
    deleteKey(input: $input, condition: $condition) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
