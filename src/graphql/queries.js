/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTopicProgress = /* GraphQL */ `
  query GetTopicProgress($id: ID!) {
    getTopicProgress(id: $id) {
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
export const listTopicProgresses = /* GraphQL */ `
  query ListTopicProgresses(
    $filter: ModelTopicProgressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTopicProgresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        topic
        practicedCount
        correctAnswers
        examName
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUserProgress = /* GraphQL */ `
  query GetUserProgress($id: ID!) {
    getUserProgress(id: $id) {
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
export const listUserProgresses = /* GraphQL */ `
  query ListUserProgresses(
    $filter: ModelUserProgressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProgresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
