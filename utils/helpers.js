import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { FLASHCARDS_STORAGE_KEY } from "./_deck";

export const createCard = (question, answer) => {
  return {
    question,
    answer
  }
}

export const roundScore = (score, questions) => {
  const percent = ((score/questions)*100).toFixed(2)
  return percent
}

export const clearLocalNotification = () => {
  return Notifications.cancelAllScheduledNotificationsAsync
}

export const createNotification = () => {
  return {
    title: 'Did you study for the day?',
    body: "Don't forget to quiz yourself at least once a day!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMintutes(0)

              Notifications.scheduleLocalNotificationsAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(true))
            }
          })
      }
    })
}